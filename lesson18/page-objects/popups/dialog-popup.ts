import { expect, Locator, Page } from '@playwright/test';
import { AddWishPopup } from './add-wish-popup';

export class DialogPopup extends AddWishPopup {
    private readonly popupLocator = this.page.locator('[id^="headlessui-dialog-panel"]');

    public constructor(page: Page) {
        super(page);
    }

    public get popup(): Locator {
        return this.popupLocator;
    }

    public get popupText(): Locator {
        return this.popupLocator.locator('.items-start .space-y-2');
    }

    public get createWishlistBtn(): Locator {
        return this.popupLocator.locator('.items-start .mt-5 [type="button"]:first-child');
    }

    public async checkWishlistCreatedAndAddWishPopupOpened(): Promise<void> {
        await expect(this.popupText).toBeVisible();
        await expect(this.popupText).toContainText('Ваш перший вішліст готовий! 🎉');
        await expect(this.createWishlistBtn).toHaveCSS('background-color', 'oklch(0.511 0.262 276.966)');
        await expect(this.createWishlistBtn).toHaveText('Додати бажання');
        await this.createWishlistBtn.click();
        await expect(this.addWishInput).toBeVisible();
        await expect(this.addWishInput).toHaveAttribute('placeholder', 'https:// або назва бажання');
    }
}
