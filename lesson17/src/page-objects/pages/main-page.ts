import { By, WebDriver, WebElement } from 'selenium-webdriver';
import { getWaitedLocator } from '../../driver-manager';

export class MainPage {
    public constructor(private readonly driver: WebDriver) {}

    public async goToHomePage(): Promise<void> {
        await this.driver.get(process.env.BASE_URL ? process.env.BASE_URL : '');
    }

    public async goToWishlistsPage(): Promise<void> {
        await this.driver.get(`${process.env.BASE_URL}/uk/wishlists`);
    }

    public async acceptCookies(): Promise<void> {
        const btn = await getWaitedLocator(this.driver, By.css('#cookiescript_accept'));
        await btn.click();
    }

    public async visitMainWithCookies(): Promise<void> {
        await this.goToHomePage();
        await this.acceptCookies();
    }

    public async getHowItWorksButton(): Promise<WebElement> {
        return getWaitedLocator(this.driver, By.css('a[href="#how-it-works"]'));
    }

    public async getHowItWorksSectionTitle(): Promise<WebElement> {
        return getWaitedLocator(this.driver, By.css('#how-it-works h2.font-header'));
    }

    public async getBlogButton(): Promise<WebElement> {
        return getWaitedLocator(this.driver, By.css('[href="/uk/blog"]'));
    }

    public async getBlogItems(): Promise<WebElement[]> {
        await getWaitedLocator(this.driver, By.css('.group .cursor-pointer'));
        return this.driver.findElements(By.css('.group .cursor-pointer'));
    }

    public async getBlogItemsImages(): Promise<WebElement[]> {
        await getWaitedLocator(this.driver, By.css('.group .cursor-pointer img'));
        return this.driver.findElements(By.css('.group .cursor-pointer img'));
    }

    public async getCreateWishlistButton(): Promise<WebElement> {
        return getWaitedLocator(this.driver, By.css('.relative.z-10 .mt-10 button'));
    }
}
