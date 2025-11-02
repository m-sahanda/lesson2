import { expect } from 'chai';
import sinon, { stubInterface } from 'ts-sinon';
import { ChargerTypeC, Phone, Laptop, Headphones } from '../../src/abstractions/abstract-devices-class';
import { ICharger } from '../../src/abstractions/charger.dto';
import { ApiObjectInterfaceSummary } from '../../src/models/api-objects-class';
import { ApiObjectRawDto } from '../../src/models/api-objets.dto';

describe('lesson11: sinon mocks/stubs', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should call console.log with correct message in Phone.describe (spy on function)', () => {
        const consoleSpy = sinon.spy(console, 'log');
        const phone = new Phone('Pixel', 'Android', new ChargerTypeC());

        phone.describe();

        expect(consoleSpy.calledOnce).to.equal(true);
        const [msg] = consoleSpy.firstCall.args as [string];
        expect(msg).to.equal('Phone: Pixel, OS: Android');
    });

    it('should keep first owner when second device tries to use busy charger (spy + stub)', () => {
        const consoleStub = sinon.stub(console, 'log');
        const charger = new ChargerTypeC();
        const phone = new Phone('Samsung', 'Android', charger);
        const laptop = new Laptop('Dell', 'i7', charger);

        const onSpy = sinon.spy(charger, 'chargeOn');

        expect(charger.chargeOn(phone)).to.equal(true);

        laptop.startCharging();

        expect(onSpy.callCount).to.equal(2);
        expect(onSpy.firstCall.args).to.deep.equal([phone]);
        expect(onSpy.secondCall.args).to.deep.equal([laptop]);
        expect(charger.isCharging).to.equal(true);
        expect(charger.currentOwner).to.equal(phone);
        expect(consoleStub.called).to.equal(true);
    });

    it('Device.busyInfo should be "free" when charger is not charging (mock object)', () => {
        const mockCharger = stubInterface<ICharger>();
        Object.defineProperty(mockCharger, 'isCharging', { get: () => false });
        Object.defineProperty(mockCharger, 'currentOwner', { get: () => null });

        const hp = new Headphones('Audeze', 'Maxwell', mockCharger);
        expect(hp.busyInfo).to.equal('free');
    });

    it('Device.busyInfo should mention self or other owner correctly (mock object)', () => {
        const mockCharger = stubInterface<ICharger>();
        const me = new Laptop('HP', 'Ryzen', mockCharger);
        const other = new Phone('Huawei', 'iOS', mockCharger);

        Object.defineProperty(mockCharger, 'isCharging', { get: () => true, configurable: true });
        Object.defineProperty(mockCharger, 'currentOwner', { get: () => me, configurable: true });
        expect(me.busyInfo).to.equal('busy by me (HP)');

        Object.defineProperty(mockCharger, 'currentOwner', { get: () => other, configurable: true });
        expect(me.busyInfo).to.equal('busy by Huawei');
    });

    it('ApiObjectInterfaceSummary should build title/specs/price/capacity', () => {
        const raw = stubInterface<ApiObjectRawDto>();
        const data = stubInterface<Record<string, unknown>>();

        data.color = 'red';
        data.price = '999';
        data['capacity GB'] = '128';

        raw.id = 'id-1';
        raw.name = 'iPhone';
        raw.data = data;

        const summary = new ApiObjectInterfaceSummary(raw);
        expect(summary.id).to.equal('id-1');
        expect(summary.title).to.equal('iPhone painted in (red)');
        expect(summary.specsCount).to.be.greaterThan(0);
        expect(summary.price).to.equal(999);
        expect(summary.capacityGb).to.equal(128);
    });

    it('ApiObjectInterfaceSummary should fallback when price/capacity are not numeric', () => {
        const raw = stubInterface<ApiObjectRawDto>();
        const data = stubInterface<Record<string, unknown>>();

        data.price = 'N/A';
        data.Capacity = 'unknown';
        data.color = 'red';

        raw.id = 'id-2';
        raw.name = 'Stub object';
        raw.data = data;

        const summary = new ApiObjectInterfaceSummary(raw);
        expect(summary.title).to.equal('Stub object painted in (red)');
        expect(summary.price).to.equal('Please call as to get a price');
        expect(summary.capacityGb).to.equal('Unknown capacity, you can call as to get a capacity');
    });
});
