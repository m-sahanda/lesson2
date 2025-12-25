import { test, expect } from '../../src/fixtures/fixture';

test.describe('Expense test', (): void => {
    const timestamp = Date.now();
    const timestamp2 = Date.now() + 100;
    const timestamp3 = Date.now() + 300;
    const expenseAmount = 150;
    const expenseAmount2 = 4500;
    const editedAmount = 789;

    test.beforeAll('Clear all expenses', async ({ apiConstructor }) => {
        await apiConstructor.expense.clearAllExpenses();
    });

    test.afterAll('Clear all expenses', async ({ apiConstructor }) => {
        await apiConstructor.expense.clearAllExpenses();
    });

    test('Add/edit/delete expense', async ({ mainPage, expensesPage }): Promise<void> => {
        await mainPage.goTo();
        await mainPage.mainNavigation.expensesBtn.click();

        await test.step('add first expense', async () => {
            await expensesPage.filtersContainer.addBtn.click();

            await expensesPage.modalPopup.addRow(expenseAmount, timestamp);

            const rowData = await expensesPage.table.getRowDataByComment(`${timestamp}`);

            expect(rowData.amount).toEqual(expenseAmount);
            expect(rowData.comment).toEqual(`${timestamp}`);
            expect(rowData.isCash).toBe(false);

            const totalAmount = await expensesPage.table.getTotalAmount();

            expect(totalAmount).toEqual(expenseAmount);
        });

        await test.step('add second expense', async () => {
            await expensesPage.filtersContainer.addBtn.click();

            await expensesPage.modalPopup.addRow(expenseAmount2, timestamp2, false, true);

            const rowData = await expensesPage.table.getRowDataByComment(`${timestamp2}`);

            expect(rowData.amount).toEqual(expenseAmount2);
            expect(rowData.comment).toEqual(`${timestamp2}`);
            expect(rowData.isCash).toBe(true);

            const expectedTotalAmount = expenseAmount + expenseAmount2;
            const totalAmount = await expensesPage.table.getTotalAmount();

            expect(totalAmount).toEqual(expectedTotalAmount);
        });

        await test.step('edit expense', async () => {
            await expensesPage.table.editBtnByComment(`${timestamp}`).click();
            await expensesPage.modalPopup.addRow(editedAmount, timestamp3, false, true);

            const rowData = await expensesPage.table.getRowDataByComment(`${timestamp3}`);

            expect(rowData.amount).toEqual(editedAmount);
            expect(rowData.comment).toEqual(`${timestamp3}`);
            expect(rowData.isCash).toBe(true);

            const expectedTotalAmount = expenseAmount2 + editedAmount;
            const totalAmount = await expensesPage.table.getTotalAmount();

            expect(totalAmount).toEqual(expectedTotalAmount);
        });

        await test.step('delete expense', async () => {
            await expensesPage.table.deleteRowWithConfirmation(`${timestamp2}`);
            const expectedTotalAmount = expenseAmount2 + editedAmount;
            const totalAmount = await expensesPage.table.getTotalAmount();

            expect(totalAmount).toEqual(expectedTotalAmount);
        });
    });
});
