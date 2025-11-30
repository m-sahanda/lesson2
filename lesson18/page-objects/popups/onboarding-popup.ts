import { expect, Locator, Page } from '@playwright/test';

export class OnboardingPopup {
    private readonly popupLocator = '[id^="headlessui-dialog-panel"]';

    public constructor(private readonly page: Page) {}

    public get getPopup(): Locator {
        return this.page.locator(this.popupLocator);
    }

    public get getCreateWishlistBtn(): Locator {
        return this.page.locator(`${this.popupLocator} a[href="/uk/wishlist/new?referralInfo=wishlists_onboarding"]`);
    }

    public async checkAndClickCreateWishlistBtn(): Promise<void> {
        await expect(this.getPopup).toBeVisible();
        await this.getCreateWishlistBtn.scrollIntoViewIfNeeded();
        await expect(this.getCreateWishlistBtn).toBeVisible();
        await expect(this.getCreateWishlistBtn).toHaveText('Створити перший вішліст');
        await expect(this.getCreateWishlistBtn).toHaveCSS('background-color', 'oklch(0.511 0.262 276.966)');
        await this.getCreateWishlistBtn.click();
    }
}
