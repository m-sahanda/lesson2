import { Browser, Builder, WebDriver, Locator, WebElementPromise, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

export async function getBrowserInstance(): Promise<WebDriver> {
    const options = new chrome.Options();
    options.addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--window-size=1920,1080');
    const driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
    await driver.manage().window().maximize();
    return driver;
}

export async function closeBrowserInstance(driver: WebDriver): Promise<void> {
    await driver.quit();
}

export function getWaitedLocator(driver: WebDriver, locator: Locator, timeout = 10000): WebElementPromise {
    return driver.wait(until.elementLocated(locator), timeout);
}
