import { By, WebDriver, WebElement } from 'selenium-webdriver';
import { getWaitedLocator } from '../../driver-manager';
import { expect } from 'chai';
import { AddWishPopup } from './add-wish-popup';

export class DialogPopup extends AddWishPopup {
    private readonly popupLocator = '[id^="headlessui-dialog-panel"]';

    public constructor(driver: WebDriver) {
        super(driver);
    }

    public async getPopup(): Promise<WebElement> {
        return getWaitedLocator(this.driver, By.css(this.popupLocator));
    }

    public async getPopupText(): Promise<WebElement> {
        return getWaitedLocator(this.driver, By.css(`${this.popupLocator} .items-start .space-y-2`));
    }

    public async getCreateWishlistBtn(): Promise<WebElement> {
        return getWaitedLocator(this.driver, By.css(`${this.popupLocator} .items-start .mt-5 [type="button"]:first-child`));
    }

    public async checkWishlistCreatedAndAddWishPopupOpened(): Promise<void> {
        const textBlock = await this.getPopupText();
        const blockText = await textBlock.getText();
        expect(blockText).to.contain('Ваш перший вішліст готовий!');

        const btn = await this.getCreateWishlistBtn();
        const btnText = await btn.getText();
        expect(btnText).to.equal('Додати бажання');

        await btn.click();

        const addInput = await this.getAddWishInput();
        const placeholder = await addInput.getAttribute('placeholder');
        expect(placeholder).to.equal('https:// або назва бажання');
    }
}
