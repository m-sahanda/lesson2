import { Car } from './vehicle';
import { ElectricMotor } from './powertrain';
import { FuelTank } from './fuel-tank';

export class ElectricCar extends Car {
    public constructor(name: string, capacity: number, batteryKWh = 75, kWhPer100km = 17) {
        super(name, new ElectricMotor(kWhPer100km), new FuelTank(batteryKWh, 'kWh', capacity));
    }
}
