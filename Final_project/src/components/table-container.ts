import {Locator, Page, expect} from '@playwright/test';

export class TableContainer {
    private readonly baseLocator: Locator;

    public constructor(private readonly page: Page, containerSelector: string) {
        this.baseLocator = page.locator(containerSelector);
    }

    public get allRows(): Locator {
        return this.baseLocator.locator('tbody tr');
    }

    public getRowByComment(comment: string): Locator {
        return this.allRows.filter({ hasText: comment });
    }

    public editBtnByComment(comment: string): Locator {
        return this.getRowByComment(comment).locator('.modify-btn');
    }

    public deleteBtnByComment(comment: string): Locator {
        return this.getRowByComment(comment).locator('.delete-btn');
    }

    public async deleteRowWithConfirmation(comment: string): Promise<void> {
        this.page.once('dialog', dialog => dialog.accept());

        await this.deleteBtnByComment(comment).click();
    }

    public async getTotalAmount(): Promise<number> {
        const text = await this.baseLocator.locator('.summary-stats .total-amount').innerText();
        return parseFloat(text.replace(/[^\d,.-]/g, '').replace(',', '.'));
    }

    public async getRowDataByComment(comment: string): Promise<{date: string, amount: number, comment: string, isCash: boolean}> {
        const row = this.getRowByComment(comment);
        const amountText = await row.locator('.amount-cell').innerText();
        const normalizedAmount = amountText.replace(/\s/g, '').replace(',', '.');

        return {
            date: await row.locator('.date-cell').innerText(),
            amount: parseFloat(normalizedAmount), // Можна додати як число
            comment: await row.locator('.comment-cell').innerText(),
            isCash: (await row.locator('.cash-cell').innerText()).includes('Так')
        };
    }

    public async verifySortingByAmountDesc(): Promise<void> {
        const amountLocators = await this.baseLocator.locator('.amount-cell').all();
        const amounts: number[] = [];

        for (const locator of amountLocators) {
            const text = await locator.innerText();
            const value = parseFloat(text.replace(/[^\d,.-]/g, '').replace(',', '.'));
            amounts.push(value);
        }

        for (let i = 0; i < amounts.length - 1; i++) {
            expect(amounts[i], `Рядок ${i} (${amounts[i]}) має бути >= ніж рядок ${i + 1} (${amounts[i + 1]})`)
                .toBeGreaterThanOrEqual(amounts[i + 1]);
        }
    }
}
