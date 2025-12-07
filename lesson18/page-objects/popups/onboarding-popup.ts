import { expect, Locator, Page } from '@playwright/test';

export class OnboardingPopup {
    private readonly popupLocator = this.page.locator('[id^="headlessui-dialog-panel"]');

    public constructor(private readonly page: Page) {}

    public get popup(): Locator {
        return this.popupLocator;
    }

    public get createWishlistBtn(): Locator {
        return this.popupLocator.locator('a[href="/uk/wishlist/new?referralInfo=wishlists_onboarding"]');
    }

    public async checkAndClickCreateWishlistBtn(): Promise<void> {
        await expect(this.popup).toBeVisible();
        await this.createWishlistBtn.scrollIntoViewIfNeeded();
        await expect(this.createWishlistBtn).toBeVisible();
        await expect(this.createWishlistBtn).toHaveText('Створити перший вішліст');
        await expect(this.createWishlistBtn).toHaveCSS('background-color', 'oklch(0.511 0.262 276.966)');
        await this.createWishlistBtn.click();
    }
}
