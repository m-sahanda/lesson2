import { Car } from './vehicle';
import { Engine } from './powertrain';
import { FuelTank } from './fuel-tank';

export class Crossover extends Car {
    public readonly type = 'Crossover';

    public constructor(name: string, fuelType: string, capacity: number, fuelLiters = 60, lPer100km = 8.9) {
        super(name, new Engine(fuelType, lPer100km), new FuelTank(fuelLiters, 'L', capacity));
    }
}
