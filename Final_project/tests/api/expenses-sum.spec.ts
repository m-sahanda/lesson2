import { expect, test } from '../../src/fixtures/fixture';
import { ExpenseDTO } from '../../src/dto/expense.dto';

test.describe.configure({ mode: 'serial' });

test.describe('Expenses adding and check sum', () => {
    let expenseId: string;
    let expenseId2: string;

    const newExpense: ExpenseDTO = {
        date: '2024-01-01',
        expense: '10000',
        currency: 'UAH',
        comment: 'Test expense',
        cash: false
    };

    const newExpense2: ExpenseDTO = {
        date: '2024-01-01',
        expense: '876',
        currency: 'UAH',
        comment: 'Test expense 2',
        cash: false
    };

    test.beforeAll('clear all expenses', async ({ apiConstructor }) => {
        await apiConstructor.expense.clearAllExpenses();
    });

    test.afterAll('clear all expenses', async ({ apiConstructor }) => {
        await apiConstructor.expense.clearAllExpenses();
    });

    test('should add two expenses and check sum', async ({ apiConstructor }) => {
        await test.step('add first expense', async () => {
            expenseId = await apiConstructor.expense.addExpenseAndCheckMsg(newExpense);

            await apiConstructor.expense.checkExpensesDataById(expenseId, newExpense);
        });

        await test.step('add second expense', async () => {
            expenseId2 = await apiConstructor.expense.addExpenseAndCheckMsg(newExpense2);

            await apiConstructor.expense.checkExpensesDataById(expenseId2, newExpense2);
        });

        await test.step('check sum of expenses', async () => {
            const expenses = await apiConstructor.expense.getExpenses();
            const expenseSum = expenses.reduce((sum, i) => sum + Number(i.expense), 0);
            const expectedSum = Number(newExpense.expense) + Number(newExpense2.expense);

            expect(expenseSum).toEqual(expectedSum);
        });
    });
    test('delete first expense and check deleting', async ({ apiConstructor }) => {
        await test.step('delete first income', async () => {
            await apiConstructor.expense.deleteExpenseAndCheckMsg(expenseId);
            await apiConstructor.expense.checkExpensesNotContainId(expenseId);
        });

        await test.step('check only second income still present', async () => {
            const incomes = await apiConstructor.expense.getExpenses();

            expect(incomes.length).toEqual(1);

            await apiConstructor.expense.checkExpensesDataById(expenseId2, newExpense2);
        });
    });
});
