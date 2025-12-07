import { By, WebDriver, WebElement } from 'selenium-webdriver';
import { getWaitedLocator } from '../../driver-manager';
import { expect } from 'chai';

export class OnboardingPopup {
    private readonly popupLocator = '[id^="headlessui-dialog-panel"]';

    public constructor(private readonly driver: WebDriver) {}

    public async getPopup(): Promise<WebElement> {
        return getWaitedLocator(this.driver, By.css(`${this.popupLocator}`));
    }

    public async getCreateWishlistBtn(): Promise<WebElement> {
        return getWaitedLocator(this.driver, By.css(`${this.popupLocator} a[href="/uk/wishlist/new?referralInfo=wishlists_onboarding"]`));
    }

    public async checkAndClickCreateWishlistBtn(): Promise<void> {
        await (await this.getPopup()).isDisplayed();

        const btn = await this.getCreateWishlistBtn();

        await this.driver.executeScript('arguments[0].scrollIntoView({block: "center"});', btn);

        const text = await btn.getText();
        expect(text).to.equal('Створити перший вішліст');

        await btn.click();
    }
}
