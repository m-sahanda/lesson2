import assert from 'node:assert';
import { expect } from 'chai';
import { ChargerTypeC, Phone, Laptop, Headphones } from '../../src/abstractions/abstract-devices-class';
import { describe } from 'mocha';

describe('ChargerTypeC', () => {
    it('should be not charging with no owner', () => {
        const charger = new ChargerTypeC();

        assert.strictEqual(charger.isCharging, false);
        assert.strictEqual(charger.currentOwner, null);
        expect(charger.isCharging).to.equal(false);
        expect(charger.currentOwner).to.equal(null);
    });

    it('should start charging with the first owner and set owner', () => {
        const charger = new ChargerTypeC();
        const phone = new Phone('Pixel', 'Android', charger);
        const started = charger.chargeOn(phone);

        expect(started).to.equal(true);
        expect(charger.isCharging).to.equal(true);
        assert.strictEqual(charger.currentOwner, phone);
    });

    it('should be re-entrant for the same owner and keep owner', () => {
        const charger = new ChargerTypeC();
        const phone = new Phone('Pixel', 'Android', charger);

        expect(charger.chargeOn(phone)).to.equal(true);
        expect(charger.chargeOn(phone)).to.equal(true);
        assert.strictEqual(charger.isCharging, true);
        expect(charger.currentOwner).to.equal(phone);
    });

    it('should refuse a different owner while busy', () => {
        const charger = new ChargerTypeC();
        const phone = new Phone('Pixel', 'Android', charger);
        const laptop = new Laptop('Dell', 'i5', charger);

        expect(charger.chargeOn(phone)).to.equal(true);
        assert.equal(charger.chargeOn(laptop), false);
        expect(charger.currentOwner).to.equal(phone);
    });

    it('chargeOff should only work for the current owner', () => {
        const charger = new ChargerTypeC();
        const phone = new Phone('Pixel', 'Android', charger);
        const laptop = new Laptop('Dell', 'i5', charger);

        expect(charger.chargeOn(phone)).to.equal(true);
        charger.chargeOff(laptop);
        expect(charger.isCharging).to.equal(true);
        expect(charger.currentOwner).to.equal(phone);
        charger.chargeOff(phone);
        expect(charger.isCharging).to.equal(false);
        expect(charger.currentOwner).to.equal(null);
    });
});

describe('Device subclasses with a shared charger', () => {
    it('startCharging/stopCharging toggle isCharging and log busyInfo correctly', () => {
        const charger = new ChargerTypeC();
        const phone = new Phone('IPhone 5s', 'iOS', charger);
        const laptop = new Laptop('Latitude', 'i3', charger);

        expect(phone.isCharging).to.equal(false);
        expect(laptop.isCharging).to.equal(false);
        expect(phone.busyInfo).to.equal('free');
        expect(laptop.busyInfo).to.equal('free');

        phone.startCharging();
        expect(phone.isCharging).to.equal(true);
        expect(laptop.isCharging).to.equal(false);
        expect(phone.busyInfo).to.equal(`busy by me (${phone.name})`);
        expect(laptop.busyInfo).to.equal(`busy by ${phone.name}`);

        laptop.startCharging();
        expect(phone.isCharging).to.equal(true);
        expect(laptop.isCharging).to.equal(false);
        expect(charger.currentOwner).to.equal(phone);

        phone.stopCharging();
        expect(charger.isCharging).to.equal(false);
        expect(charger.currentOwner).to.equal(null);
        expect(phone.busyInfo).to.equal('free');

        laptop.startCharging();
        expect(laptop.isCharging).to.equal(true);
        expect(phone.isCharging).to.equal(false);
        expect(laptop.busyInfo).to.equal(`busy by me (${laptop.name})`);
        expect(phone.busyInfo).to.equal(`busy by ${laptop.name}`);

        laptop.stopCharging();
        expect(charger.isCharging).to.equal(false);
        expect(phone.busyInfo).to.equal('free');
        expect(laptop.busyInfo).to.equal('free');
    });

    it('another device integrates with the same charger correctly', () => {
        const charger = new ChargerTypeC();
        const phone = new Phone('IPhone 5s', 'iOS', charger);
        const headphones = new Headphones('Compact Headphones', 'Air Pods Pro', charger);

        phone.startCharging();
        expect(headphones.isCharging).to.equal(false);
        expect(headphones.busyInfo).to.equal(`busy by ${phone.name}`);

        phone.stopCharging();
        headphones.startCharging();
        expect(headphones.isCharging).to.equal(true);
        expect(charger.currentOwner).to.equal(headphones);
    });

    it('device.describe() of each subclass should not throw and be a function', () => {
        const charger = new ChargerTypeC();
        const phone = new Phone('Samsung', 'Android', charger);
        const laptop = new Laptop('MacBook', 'M1', charger);
        const headphones = new Headphones('Marshall', 'Major 4', charger);
        const devices = [phone, laptop, headphones];

        devices.forEach((device) => {
            expect(device).to.have.property('describe').that.is.a('function');
            expect(() => device.describe()).to.not.throw();
        });
    });
});
