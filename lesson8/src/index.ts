import { ApiObjectDataResponse, ApiObjectInterfaceSummary } from './models/api-objects-class';
import { ApiObjectRawDto } from './models/api-objets.dto';
import { Headphones, Laptop, Phone, ChargerTypeC } from './abstractions/abstract-devices-class';

async function getApiObjectResponseWithInterface(): Promise<ApiObjectRawDto[]> {
    const response = await fetch('https://api.restful-api.dev/objects');
    const json = await response.json();
    return json as ApiObjectRawDto[];
}

async function getApiObjectResponseWithClass(): Promise<ApiObjectDataResponse[]> {
    const response = await fetch('https://api.restful-api.dev/objects');
    const json = await response.json();
    return (json as Record<string, unknown>[]).map((row) => new ApiObjectDataResponse(row));
}

function transformInterfaceToSummaries(rows: ApiObjectRawDto[]): ApiObjectInterfaceSummary[] {
    return rows.map((r) => new ApiObjectInterfaceSummary(r));
}

(async () => {
    console.log('--------------------1--------------------');

    const responseWithInterface = await getApiObjectResponseWithInterface();
    console.log(`responseWithInterface: ${JSON.stringify(responseWithInterface)}`);

    console.log('---------------------2-------------------');

    const apiObjectsWithInterface = await getApiObjectResponseWithInterface();
    const filteredObjectsWithInterface = apiObjectsWithInterface.filter((apiObject) => apiObject.data?.color === 'Cloudy White');
    console.log(`filteredObjectsWithInterface: ${JSON.stringify(filteredObjectsWithInterface)}`);
    console.dir(filteredObjectsWithInterface, { depth: null, colors: true });

    const summariesFromInterface = transformInterfaceToSummaries(apiObjectsWithInterface);
    console.log('summariesFromInterface:', summariesFromInterface);

    console.log('---------------------3-------------------');

    const responseWithClass = await getApiObjectResponseWithClass();
    console.log(`responseWithClass: ${JSON.stringify(responseWithClass)}`);

    console.log('--------------------4--------------------');
    const apiObjectsWithClass = await getApiObjectResponseWithClass();
    const filteredObjectsWithClass = apiObjectsWithClass.filter((apiObject) => apiObject.data?.color === 'Cloudy White');
    console.log(`filteredObjectsWithClass: ${JSON.stringify(filteredObjectsWithClass)}`);
    console.dir(filteredObjectsWithClass, { depth: null, colors: true });

    console.log('-------------------5---------------------');

    const transformedObject = transformInterfaceToSummaries(filteredObjectsWithInterface);
    console.dir(transformedObject, { depth: null, colors: true });
})();

const universalCharger = new ChargerTypeC();

const phone = new Phone('IPhone 5s', 'IOS 9', universalCharger);
const laptop = new Laptop('Dell Latitude', 'Intel i3', universalCharger);

phone.describe();
laptop.describe();

phone.startCharging();
console.log('Phone charging?', phone.isCharging);
console.log('Laptop charging?', laptop.isCharging);

laptop.startCharging();
console.log('Laptop charging?', laptop.isCharging);
console.log('Phone charging?', phone.isCharging);

laptop.stopCharging();
console.log(laptop.busyInfo);

phone.stopCharging();
console.log(laptop.busyInfo);
console.log(universalCharger.currentOwner);

laptop.startCharging();
console.log(universalCharger.currentOwner);
console.log(phone.busyInfo);

const airPods = new Headphones('Compact Headphoned', 'Air Pods Pro', universalCharger);
airPods.describe();
airPods.startCharging();
console.log(universalCharger.currentOwner);

laptop.stopCharging();
airPods.startCharging();
console.log(airPods.isCharging);
