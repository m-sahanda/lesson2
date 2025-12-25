import { test, expect } from '../../src/fixtures/fixture';

test.describe('Income test', (): void => {
    const timestamp = Date.now();
    const timestamp2 = Date.now() + 100;
    const timestamp3 = Date.now() + 300;
    const incomeAmount = 100;
    const incomeAmount2 = 3000;
    const editedAmount = 456;

    test.beforeAll('Clear all incomes', async ({ apiConstructor }) => {
        await apiConstructor.income.clearAllIncomes();
    });

    test.afterAll('Clear all incomes', async ({ apiConstructor }) => {
        await apiConstructor.income.clearAllIncomes();
    });

    test('Add/edit/delete income', async ({ mainPage, incomesPage }): Promise<void> => {
        await mainPage.goTo();
        await mainPage.mainNavigation.incomesBtn.click();

        await test.step('add first income', async () => {
            await incomesPage.filtersContainer.addBtn.click();

            await incomesPage.modalPopup.addRow(incomeAmount, timestamp);

            const rowData = await incomesPage.table.getRowDataByComment(`${timestamp}`);

            expect(rowData.amount).toEqual(incomeAmount);
            expect(rowData.comment).toEqual(`${timestamp}`);
            expect(rowData.isCash).toBe(false);

            const filterContainerAmount = await incomesPage.table.getTotalAmount();

            expect(filterContainerAmount).toEqual(incomeAmount);
        });
        await test.step('add second income', async () => {
            await incomesPage.filtersContainer.addBtn.click();

            await incomesPage.modalPopup.addRow(incomeAmount2, timestamp2, false, true);

            const rowData = await incomesPage.table.getRowDataByComment(`${timestamp2}`);

            expect(rowData.amount).toEqual(incomeAmount2);
            expect(rowData.comment).toEqual(`${timestamp2}`);
            expect(rowData.isCash).toBe(true);

            const expectedTotalAmount = incomeAmount + incomeAmount2;
            const filterContainerAmount = await incomesPage.table.getTotalAmount();

            expect(filterContainerAmount).toEqual(expectedTotalAmount);
        });

        await test.step('edit income', async () => {
            await incomesPage.table.editBtnByComment(`${timestamp}`).click();
            await incomesPage.modalPopup.addRow(editedAmount, timestamp3, false, true);

            const rowData = await incomesPage.table.getRowDataByComment(`${timestamp3}`);

            expect(rowData.amount).toEqual(editedAmount);
            expect(rowData.comment).toEqual(`${timestamp3}`);
            expect(rowData.isCash).toBe(true);

            const expectedTotalAmount = incomeAmount2 + editedAmount;
            const filterContainerAmount = await incomesPage.table.getTotalAmount();

            expect(filterContainerAmount).toEqual(expectedTotalAmount);
        });

        await test.step('delete income', async () => {
            await incomesPage.table.deleteRowWithConfirmation(`${timestamp2}`);
            const filterContainerAmount = await incomesPage.table.getTotalAmount();

            expect(filterContainerAmount).toEqual(editedAmount);
        });
    });
});
