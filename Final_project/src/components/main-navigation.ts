import {Locator, Page} from '@playwright/test';

export class MainNavigation {
    protected readonly baseLocator: Locator;

    public constructor(private readonly page: Page) {
        this.baseLocator = page.locator('.main-navigation ');
    };

    public get incomesBtn(): Locator {
        return this.baseLocator.locator('.nav-item  a[href="/incomes"]');
    }

    public get expensesBtn(): Locator {
        return this.baseLocator.locator('a[href="/expenses"]');
    }

    public get taxesDropdownBtn(): Locator {
        return this.baseLocator.locator('.nav-item')
            .filter({ has: this.page.locator('a[href*="/taxes"]') })
            .locator('button');
    }

    public get reportsDropdownBtn(): Locator {
        return this.baseLocator.locator('.nav-item')
            .filter({ has: this.page.locator('a[href*="/reports"]') })
            .locator('button');
    }

    public get taxesAllBtn(): Locator {
        return this.baseLocator.locator('a[href="/taxes/all"]');
    }

    public get taxesPendingBtn(): Locator {
        return this.baseLocator.locator('a[href="/taxes/pending"]');
    }

    public get taxesPaidBtn(): Locator {
        return this.baseLocator.locator('a[href="/taxes/paid"]');
    }

    public get reportsBtn(): Locator {
        return this.baseLocator.locator('.nav-item')
            .filter({ has: this.page.locator('a[href*="/reports"]') })
            .locator('button');
    }

    public get reportsAllBtn(): Locator {
        return this.baseLocator.locator('a[href="/reports/all"]');
    }

    public get reportsCurrentBtn(): Locator {
        return this.baseLocator.locator('a[href="/reports/current"]');
    }

    public get reportsSubmittedBtn(): Locator {
        return this.baseLocator.locator('a[href="/reports/submitted"]');
    }
}
