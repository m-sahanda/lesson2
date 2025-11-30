import { expect, Locator, Page } from '@playwright/test';
import { AddWishPopup } from './add-wish-popup';

export class DialogPopup extends AddWishPopup {
    private readonly popupLocator = '[id^="headlessui-dialog-panel"]';

    public constructor(page: Page) {
        super(page);
    }

    public get getPopup(): Locator {
        return this.page.locator(this.popupLocator);
    }

    public get getPopupText(): Locator {
        return this.page.locator(this.popupLocator).locator('.items-start .space-y-2');
    }

    public get getCreateWishlistBtn(): Locator {
        return this.page.locator(this.popupLocator).locator('.items-start .mt-5 [type="button"]:first-child');
    }

    public async checkWishlistCreatedAndAddWishPopupOpened(): Promise<void> {
        await expect(this.getPopupText).toBeVisible();
        await expect(this.getPopupText).toContainText('Ваш перший вішліст готовий! 🎉');
        await expect(this.getCreateWishlistBtn).toHaveCSS('background-color', 'oklch(0.511 0.262 276.966)');
        await expect(this.getCreateWishlistBtn).toHaveText('Додати бажання');
        await this.getCreateWishlistBtn.click();
        await expect(this.getAddWishInput).toBeVisible();
        await expect(this.getAddWishInput).toHaveAttribute('placeholder', 'https:// або назва бажання');
    }
}
