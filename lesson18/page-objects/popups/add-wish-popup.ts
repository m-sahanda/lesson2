import { Locator, Page } from '@playwright/test';

export class AddWishPopup {
    public constructor(protected readonly page: Page) {}

    public get getAddWishInput(): Locator {
        return this.page.locator('.relative.mt-2 input');
    }
}
