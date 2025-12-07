import { By, WebDriver, WebElement } from 'selenium-webdriver';
import { getWaitedLocator } from '../../driver-manager';

export class AddWishPopup {
    public constructor(protected readonly driver: WebDriver) {}

    public async getAddWishInput(): Promise<WebElement> {
        return getWaitedLocator(this.driver, By.css('.relative.mt-2 input'));
    }
}
