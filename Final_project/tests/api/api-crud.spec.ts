import {test, expect} from '../../src/fixtures/fixture';
import {ExpenseDTO} from '../../src/dto/expense.dto';
import {IncomeDTO} from '../../src/dto/income.dto';
import {ReportDTO} from '../../src/dto/report.dto';

test.describe.configure({mode: 'serial'});

test.describe('API CRUD Tests', () => {
    test.beforeAll(async ({apiConstructor}) => {
        await apiConstructor.income.clearAllIncomes();
        await apiConstructor.expense.clearAllExpenses();
    });

    test.describe('Expenses', () => {

        test('should add, update and delete an expense', async ({apiConstructor}) => {
            let expenseId: string;

            await test.step('add', async () => {

                const newExpense: ExpenseDTO = {
                    date: '2024-01-01',
                    expense: '150',
                    currency: 'UAH',
                    comment: 'Test expense',
                    cash: false
                };

                expenseId = await apiConstructor.expense.addExpenseAndCheckMsg(newExpense);

                expect(expenseId).toBeDefined();

                await apiConstructor.expense.checkExpensesDataById(expenseId, newExpense);
            });

            await test.step('update', async () => {

                const updatedExpense: ExpenseDTO = {
                    id: expenseId!,
                    date: '2024-01-01',
                    expense: '160',
                    currency: 'UAH',
                    comment: 'Updated test expense',
                    cash: false
                };

                await apiConstructor.expense.updateExpenseAndCheckMsg(expenseId, updatedExpense);

                await apiConstructor.expense.checkExpensesDataById(expenseId, updatedExpense);
            });

            await test.step('delete', async () => {
                await apiConstructor.expense.deleteExpenseAndCheckMsg(expenseId);
                await apiConstructor.expense.checkExpensesNotContainId(expenseId);
            });
        });
    });

    test.describe('Incomes', () => {

        test('should add, update and delete an income', async ({apiConstructor}) => {
            let incomeId: string;

            const newIncome: IncomeDTO = {
                date: '2024-01-01',
                income: '15000',
                currency: 'UAH',
                comment: 'Consulting services',
                cash: false
            };

            await test.step('add', async () => {
                incomeId = await apiConstructor.income.addIncomeAndCheckMsg(newIncome);
                expect(incomeId).toBeDefined();
                await apiConstructor.income.checkIncomesDataById(incomeId, newIncome);
            });

            await test.step('update', async () => {
                const updatedIncome: IncomeDTO = {
                    id: incomeId,
                    date: '2024-01-01',
                    income: '16000',
                    currency: 'USD',
                    comment: 'Updated consulting services',
                    cash: false
                };
                await apiConstructor.income.updateIncomeAndCheckMsg(incomeId, updatedIncome);
                await apiConstructor.income.checkIncomesDataById(incomeId, updatedIncome);
            });

            await test.step('delete', async () => {
                await apiConstructor.income.deleteIncomeAndCheckMsg(incomeId);
                await apiConstructor.income.checkIncomesNotContainId(incomeId);
            });
        });
    });

    test.describe('Reports', () => {
        let savedReport: string;
        test('should get pending reports', async ({apiConstructor}) => {
            const res = await apiConstructor.report.getReports();
            console.log(res);
        });

        test('should save report', async ({apiConstructor}) => {

            const report: ReportDTO = {
                id: crypto.randomUUID(),
                date: new Date().toISOString().split('T')[0],
                incomes: 333,
                expenses: 1111,
                flatTax: 2222,
                flatTaxQ: 213,
                ssp: 123342,
                vat: 123234,
                militaryTax: 123
            };

            savedReport = await apiConstructor.report.saveReport(report);
        });

        test('should delete report', async ({apiConstructor}) => {
            await apiConstructor.report.deleteReportAndCheckMsg(savedReport);
        });
    });
});
