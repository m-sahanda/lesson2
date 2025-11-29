import { WebDriver } from 'selenium-webdriver';
import { closeBrowserInstance, getBrowserInstance } from '../src/driver-manager';
import { expect } from 'chai';
import { MainPage } from '../src/page-objects/pages/main-page';
import { DialogPopup } from '../src/page-objects/popups/dialog-popup';
import { OnboardingPopup } from '../src/page-objects/popups/onboarding-popup';

describe('Wishpicks main page spec', () => {
    let driver: WebDriver;
    let mainPage: MainPage;

    beforeEach(async () => {
        driver = await getBrowserInstance();
        await driver.manage().setTimeouts({ implicit: 0, pageLoad: 60000, script: 30000 });
        mainPage = new MainPage(driver);
        await mainPage.visitMainWithCookies();
    });

    afterEach(async () => {
        await closeBrowserInstance(driver);
    });

    it('check anchor link to "How it works" header', async function () {
        const howBtn = await mainPage.getHowItWorksButton();
        await howBtn.click();
        const title = await mainPage.getHowItWorksSectionTitle();

        expect(await title.isDisplayed()).to.equal(true);
        expect(await title.getText()).to.equal('Як створити вішліст на Wishpicks');
    });

    it('check blog page open and contain 4 blog items', async function () {
        const blogBtn = await mainPage.getBlogButton();
        await blogBtn.click();

        const items = await mainPage.getBlogItems();
        expect(items.length).to.equal(4);

        const images = await mainPage.getBlogItemsImages();
        expect(images.length).to.equal(4);

        for (const img of images) {
            const src = await img.getAttribute('src');
            expect(src).to.contain('/_next/image?');
        }
    });

    it('create wishlist', async function () {
        const createBtn = await mainPage.getCreateWishlistButton();
        await createBtn.click();

        const dialog = new DialogPopup(driver);
        await dialog.checkWishlistCreatedAndAddWishPopupOpened();
    });
});

describe('Wishpicks spec', () => {
    let driver: WebDriver;
    let mainPage: MainPage;

    beforeEach(async () => {
        driver = await getBrowserInstance();
        await driver.manage().setTimeouts({ implicit: 0, pageLoad: 60000, script: 30000 });
        mainPage = new MainPage(driver);
    });

    afterEach(async () => {
        await closeBrowserInstance(driver);
    });

    it('create wishlist from all wishlists page', async function () {
        await mainPage.goToWishlistsPage();
        await mainPage.acceptCookies();

        const onboarding = new OnboardingPopup(driver);
        await onboarding.checkAndClickCreateWishlistBtn();

        const dialog = new DialogPopup(driver);
        await dialog.checkWishlistCreatedAndAddWishPopupOpened();
    });
});
