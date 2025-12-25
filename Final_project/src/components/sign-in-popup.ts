import {Page, Locator} from '@playwright/test';

export class SignInPopup {

    protected readonly baseLocator: Locator;

    public constructor(private readonly page: Page) {
        this.baseLocator = page.locator('.login-modal-form ');
    };

    public emailInput():Locator {
        return this.baseLocator.locator('#login-email');
    };

    public passwordInput():Locator {
        return this.baseLocator.locator('#login-password');
    };

    public getSubmitBtn():Locator {
        return this.baseLocator.locator('.login-submit-button');
    };
}
