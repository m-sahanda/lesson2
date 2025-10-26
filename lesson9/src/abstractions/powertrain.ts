import { IFuelTank } from './fuel-tank';

export interface IPowertrain {
    readonly kind: string;
    start(): void;
    stop(): void;
    consume(distanceKm: number, fuelTank: IFuelTank): number;
    rangeKm(storage: IFuelTank): number;
}

export class Engine implements IPowertrain {
    public readonly kind: string;
    private readonly consumption: number;
    private running = false;

    public constructor(fuelType: string, lPer100km: number) {
        this.kind = `${fuelType} Engine`;
        this.consumption = Math.max(0.1, lPer100km);
    }

    public start(): void {
        if (!this.running) this.running = true;
    }

    public stop(): void {
        if (this.running) this.running = false;
    }

    public consume(distanceKm: number, fuelTank: IFuelTank): number {
        if (!this.running) return 0;

        const reqKm = Math.max(0, distanceKm);
        if (reqKm === 0) return 0;

        const available = Math.max(0, fuelTank.amount());
        const litersPerKm = this.consumption / 100; // L per 1 km
        const needed = litersPerKm * reqKm;

        if (available >= needed) {
            fuelTank.consume(needed);
            return reqKm;
        }

        const possibleKm = available > 0 ? available / litersPerKm : 0;
        if (available > 0) fuelTank.consume(available);
        if (this.running) {
            this.stop();
            const msg = fuelTank.unit.toLowerCase() === 'l' ? 'Fuel tank is empty — engine stopped' : 'Battery is empty — engine stopped';
            console.log(msg);
        }
        return Math.round(possibleKm * 100) / 100;
    }

    public rangeKm(fuelTank: IFuelTank): number {
        return (fuelTank.amount() / this.consumption) * 100;
    }
}

export class ElectricMotor implements IPowertrain {
    public readonly kind = 'Electric Motor';
    private readonly kWhPer100km: number;
    private running = false;

    public constructor(kWhPer100km: number) {
        this.kWhPer100km = Math.max(0.1, kWhPer100km);
    }

    public start(): void {
        if (!this.running) this.running = true;
    }

    public stop(): void {
        if (this.running) this.running = false;
    }

    public consume(distanceKm: number, battery: IFuelTank): number {
        if (!this.running) return 0;

        const reqKm = Math.max(0, distanceKm);
        if (reqKm === 0) return 0;

        const available = Math.max(0, battery.amount());
        const kWhPerKm = this.kWhPer100km / 100;
        const needed = kWhPerKm * reqKm;

        if (available >= needed) {
            battery.consume(needed);
            const regen = Math.round(needed * 0.05 * 100) / 100;
            if (regen > 0) {
                battery.add(regen);
                console.log(`Recuperated: ${regen} ${battery.unit}`);
            }
            return reqKm;
        }

        const possibleKmRaw = available > 0 ? available / kWhPerKm : 0;
        const possibleKm = Math.round(possibleKmRaw * 100) / 100;

        if (available > 0) {
            battery.consume(available);
            const regen = Math.round(available * 0.05 * 100) / 100;
            if (regen > 0) {
                battery.add(regen);
                console.log(`Recuperated: ${regen} ${battery.unit}`);
            }
        }

        if (this.running) {
            this.stop();
            const msg = battery.unit.toLowerCase() === 'l' ? 'Fuel tank is empty — engine stopped' : 'Battery is empty — engine stopped';
            console.log(msg);
        }
        return possibleKm;
    }

    public rangeKm(battery: IFuelTank): number {
        return (battery.amount() / this.kWhPer100km) * 100;
    }
}
