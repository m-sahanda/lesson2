import {Locator, Page} from '@playwright/test';

export class FiltersContainer {
    private readonly baseLocator: Locator;

    public constructor(private readonly page: Page) {
        this.baseLocator = page.locator('.filters-container');
    }
    public get addBtn(): Locator {
        return this.baseLocator.locator('.add-button');
    };
}
