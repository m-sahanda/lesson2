import { Sedan } from './sedan';

export interface IClimateSystem {
    climateOn(): void;
    climateOff(): void;
    readonly isClimateOn: boolean;
}

export class ComfortSedan extends Sedan implements IClimateSystem {
    public isClimateOn = false;
    public readonly climateOverhead = 1;

    public constructor(name: string, fuelType: string, capacity: number, fuelLiters = 50, lPer100km = 7.2) {
        super(name, fuelType, capacity, fuelLiters, lPer100km);
    }

    public climateOn(): void {
        if (this.isClimateOn) return;
        this.isClimateOn = true;
    }

    public climateOff(): void {
        if (!this.isClimateOn) return;
        this.isClimateOn = false;
    }

    public override drive(distanceKm: number): number {
        if (distanceKm <= 0) return 0;

        const baseConsumption = this.powertrain.consumptionPer100();
        const actualConsumption = baseConsumption + (this.isClimateOn ? this.climateOverhead : 0);
        const increaseConsumptionIndex = actualConsumption / baseConsumption;
        const innerDriven = this.powertrain.consume(distanceKm * increaseConsumptionIndex, this.fuelTank);

        return Math.round((innerDriven / increaseConsumptionIndex) * 100) / 100;
    }

    public override rangeKm(): number {
        const baseRange = this.powertrain.rangeKm(this.fuelTank);
        const baseConsumption = this.powertrain.consumptionPer100();
        const actualConsumption = baseConsumption + (this.isClimateOn ? this.climateOverhead : 0);
        const increaseConsumptionIndex = actualConsumption / baseConsumption;

        return Math.round((baseRange / increaseConsumptionIndex) * 100) / 100;
    }
}
