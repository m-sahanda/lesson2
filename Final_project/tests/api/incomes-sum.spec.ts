import {expect, test} from '../../src/fixtures/fixture';
import {IncomeDTO} from '../../src/dto/income.dto';

test.describe.configure({mode: 'serial'});

test.describe('Incomes adding and sum check', () => {
    let incomeId: string;
    let incomeId2: string;

    const newIncome: IncomeDTO = {
        date: '2024-01-01',
        income: '15000',
        currency: 'UAH',
        comment: 'Consulting services',
        cash: false
    };

    const newIncome2: IncomeDTO = {
        date: '2025-01-01',
        income: '458',
        currency: 'UAH',
        comment: 'Consulting services2',
        cash: false
    };

    test.beforeAll('clear all incomes', async ({apiConstructor}) => {
        await apiConstructor.income.clearAllIncomes();
    });

    test.afterAll('clear all incomes', async ({apiConstructor}) => {
        await apiConstructor.income.clearAllIncomes();
    });

    test('should add two incomes and check sum', async ({apiConstructor}) => {

        await test.step('add first income', async () => {
            incomeId = await apiConstructor.income.addIncomeAndCheckMsg(newIncome);

            await apiConstructor.income.checkIncomesDataById(incomeId, newIncome);
        });

        await test.step('add second income', async () => {
            incomeId2 = await apiConstructor.income.addIncomeAndCheckMsg(newIncome2);

            await apiConstructor.income.checkIncomesDataById(incomeId2, newIncome2);
        });

        await test.step('check sum of incomes', async () => {
            const incomes = await apiConstructor.income.getIncomes();
            const incomesSum = incomes.reduce((sum, i) => sum + Number(i.income), 0);
            const expectedSum = Number(newIncome.income) + Number(newIncome2.income);

            expect(incomesSum).toEqual(expectedSum);
        });

    });

    test('delete first income and check deleting', async({apiConstructor}) => {

        await test.step('delete first income', async () => {
            await apiConstructor.income.deleteIncomeAndCheckMsg(incomeId);
            await apiConstructor.income.checkIncomesNotContainId(incomeId);
        });

        await test.step('check only second income still present', async () => {
            const incomes = await apiConstructor.income.getIncomes();

            expect(incomes.length).toEqual(1);

            await apiConstructor.income.checkIncomesDataById(incomeId2, newIncome2);
        });
    });
});
