import { IVehicle } from './abstractions/vehicle';
import { Sedan } from './abstractions/sedan';
import { Crossover } from './abstractions/crossover';
import { ElectricCar } from './abstractions/electric';
import { ComfortSedan } from './abstractions/comfort-sedan';

function driveInVehicle(distance: number[], vehicle: IVehicle): void {
    vehicle.start();
    console.dir(`[START ${vehicle.name}]`, vehicle.info());

    for (const km of distance) {
        const driven = vehicle.drive(km);
        console.log(`Drove ${driven} km, remaining range: ${vehicle.rangeKm()} km`);
    }

    vehicle.stop();
    console.dir(`[STOP ${vehicle.name}]`, vehicle.info());
}

function fuelRefill(refillAmount: number, vehicle: IVehicle): void {
    vehicle.stop();
    vehicle.refuel(refillAmount);
    console.dir(`After refill ${vehicle.name} has: ${vehicle.fuelLeft()} ${vehicle.fuelUnit()}`);
}

const sedan = new Sedan('Family Sedan', 'Diesel', 60, 45, 6.8);
const crossover = new Crossover('City Crossover', 'Gasoline', 70, 33, 8.2);
const ev = new ElectricCar('Urban EV', 100, 62, 15.5);
const comfortSedan = new ComfortSedan('Comfort Sedan', 'Diesel', 60, 45, 6.8);

driveInVehicle([120, 50], sedan);

driveInVehicle([30, 65], crossover);

driveInVehicle([100], ev);

fuelRefill(15, sedan);

fuelRefill(20, crossover);

fuelRefill(25, ev);

driveInVehicle([400, 50], sedan);

console.log(sedan.fuelLeft());
sedan.refuel(50);
sedan.stop();
sedan.drive(100);
console.log(sedan.info());

driveInVehicle([400, 50], ev);
ev.fuelLeft();
console.log(ev.rangeKm());
driveInVehicle([50, 100], ev);

fuelRefill(50, crossover);
driveInVehicle([100, 100], crossover);

console.log(comfortSedan.rangeKm());
comfortSedan.climateOn();
console.log(comfortSedan.rangeKm());

comfortSedan.climateOn();
console.log(comfortSedan.rangeKm());
const rangeBefore = comfortSedan.rangeKm();
driveInVehicle([100, 100], comfortSedan);
const rangeAfter = comfortSedan.rangeKm();
const expectedRange = Math.round((rangeBefore - 200) * 100) / 100;
console.log(expectedRange === rangeAfter ? 'yes' : 'no');
