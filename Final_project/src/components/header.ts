import {Page, Locator} from '@playwright/test';

export class Header {
    protected readonly baseLocator: Locator;

    public constructor(private readonly page: Page) {
        this.baseLocator = page.locator('.header ');
    }

    public get signInBtn(): Locator {
        return this.baseLocator.locator('.signin-button');
    }

    public get welcomeText(): Locator {
        return this.baseLocator.locator('.welcome-text');
    }

}
