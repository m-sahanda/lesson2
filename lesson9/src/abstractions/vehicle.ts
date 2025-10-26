import { IPowertrain } from './powertrain';
import { IFuelTank } from './fuel-tank';

export interface IVehicle {
    readonly name: string;
    readonly type: string;
    start(): void;
    stop(): void;
    drive(distanceKm: number): number;
    refuel(amount: number): void;
    rangeKm(): number;
    fuelLeft(): number;
    fuelUnit(): string;
    info(): string;
}

export abstract class Car implements IVehicle {
    public readonly name: string;
    public abstract readonly type: string;
    protected powertrain: IPowertrain;
    protected fuelTank: IFuelTank;

    protected constructor(name: string, powertrain: IPowertrain, fuelTank: IFuelTank) {
        this.name = name;
        this.powertrain = powertrain;
        this.fuelTank = fuelTank;
    }

    public start(): void {
        this.powertrain.start();
    }

    public stop(): void {
        this.powertrain.stop();
    }

    public drive(distanceKm: number): number {
        if (distanceKm <= 0) return 0;
        return this.powertrain.consume(distanceKm, this.fuelTank);
    }

    public refuel(amount: number): void {
        if (amount <= 0) return;
        this.fuelTank.add(amount);
    }

    public rangeKm(): number {
        const possibleRange = Math.max(0, this.powertrain.rangeKm(this.fuelTank));
        return Math.round(possibleRange * 100) / 100;
    }

    public fuelLeft(): number {
        const fuelLeft = Math.max(0, this.fuelTank.amount());
        return Math.round(fuelLeft * 100) / 100;
    }

    public fuelUnit(): string {
        return this.fuelTank.unit;
    }

    public info(): string {
        return `${this.type} ${this.name} [${this.powertrain.kind}] — range: ${this.rangeKm()} km, fuel: ${this.fuelLeft()} ${this.fuelUnit()}`;
    }
}
