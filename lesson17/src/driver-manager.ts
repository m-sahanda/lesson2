import { Browser, Builder, WebDriver, Locator, WebElementPromise, until, WebElement } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

export async function getBrowserInstance(): Promise<WebDriver> {
    const options = new chrome.Options();
    options.addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1920,1080');
    options.setUserPreferences?.({ 'intl.accept_languages': 'uk' });
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

export async function clickSafe(driver: WebDriver, el: WebElement, timeout = 15000): Promise<void> {
    await driver.executeScript('arguments[0].scrollIntoView({block:"center", inline:"center"});', el);
    await driver.wait(until.elementIsVisible(el), timeout);
    try {
        await el.click();
    } catch (e) {
        console.log(e, 'Element is not clickable, trying to click via JS');
        await driver.executeScript('arguments[0].click();', el);
    }
}
