import { getApiObjectResponseWithInterface, getApiObjectResponseWithClass, transformInterfaceToSummaries } from '../../src';
import { ApiObjectRawDto } from '../../src/models/api-objets.dto';
import { ApiObjectDataResponse } from '../../src/models/api-objects-class';

describe('jest test functions', () => {
    describe('getApiObjectResponseWithInterface and check transform', () => {
        it('should fetch API objects with interface', async () => {
            const apiObject = await getApiObjectResponseWithInterface();

            expect(apiObject).toBeDefined();
            expect(Array.isArray(apiObject)).toBe(true);

            apiObject.forEach((item: ApiObjectRawDto) => {
                expect(item).toHaveProperty('id');
                expect(item).toHaveProperty('data');
            });
        });

        it('should transform API objects to summaries', async () => {
            const apiObjects = await getApiObjectResponseWithInterface();
            const summaries = transformInterfaceToSummaries(apiObjects);

            expect(summaries).toBeDefined();
            expect(Array.isArray(summaries)).toBe(true);
            summaries.forEach((item) => {
                expect(item).toHaveProperty('id');
                expect(item).toHaveProperty('price');
                expect(item).toHaveProperty('capacityGb');
                expect(item).toHaveProperty('title');
                expect(item).toHaveProperty('specsCount');
            });
        });
    });

    describe('getApiObjectResponseWithClass and check response data', () => {
        it('should fetch API objects with class', async () => {
            const apiObject = await getApiObjectResponseWithClass();

            expect(apiObject).toBeDefined();
            expect(Array.isArray(apiObject)).toBe(true);

            apiObject.forEach((item: ApiObjectDataResponse) => {
                expect(item).toHaveProperty('id');
                expect(item).toHaveProperty('data');
            });
        });
    });
});
