import { Car } from './vehicle';
import { Engine } from './powertrain';
import { FuelTank } from './fuel-tank';

export class Sedan extends Car {
    public constructor(name: string, fuelType: string, capacity: number, fuelLiters = 50, lPer100km = 7.2) {
        super(name, new Engine(fuelType, lPer100km), new FuelTank(fuelLiters, 'L', capacity));
    }
}
