import {Locator, Page} from '@playwright/test';

export class ModalPopup {

    private readonly baseLocator: Locator;

    public constructor(private readonly page: Page) {
        this.baseLocator = page.locator('.modal-content');
    };

    public get dateSelectorBtn(): Locator {
        return this.baseLocator.locator('#date');
    }

    public get currencyDropdownBtn(): Locator {
        return this.baseLocator.locator('#currency');
    }

    public get addValueInput(): Locator {
        return this.baseLocator.locator('#amount');
    }

    public get noIncomesCheckbox(): Locator {
        return this.baseLocator.locator('.form-group')
            .filter({ hasText: 'За звітний місяць не було доходу' })
            .locator('input[type="checkbox"]');
    }

    public get cashCheckbox(): Locator {
        return this.baseLocator.locator('.form-group')
            .filter({ hasText: 'Готівкові кошти' })
            .locator('input[type="checkbox"]');
    }

    public get commentInput(): Locator {
        return this.baseLocator.locator('#comment');
    }

    public get addBtn(): Locator {
        return this.baseLocator.locator('[type="submit"]');
    }

    public get cancelBtn(): Locator {
        return this.baseLocator.locator('[type="button"]');
    }

    public async addRow(rowAmount: number, comment: string | number, noActivity = false, isCash = false): Promise<void> {
        if (noActivity) {
            await this.noIncomesCheckbox.check();
        }
        if (isCash) {
            await this.cashCheckbox.check();
        }
        await this.addValueInput.fill(`${rowAmount}`);
        await this.commentInput.fill(`${comment}`);
        await this.addBtn.click();
    }
}
