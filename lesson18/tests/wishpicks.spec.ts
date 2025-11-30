import { test, expect } from '@playwright/test';
import { MainPage } from '../page-objects/pages/main-page';
import { DialogPopup } from '../page-objects/popups/dialog-popup';
import { OnboardingPopup } from '../page-objects/popups/onboarding-popup';
import { helpers } from '../helpers/helpers';

test.describe('Wishpicks main page spec', () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.visitMainWithCookies();
    });

    test('check anchor link to "How it works" header', async () => {
        await expect(mainPage.getHowItWorksButton).toBeVisible();
        await mainPage.getHowItWorksButton.click();
        await expect(mainPage.getHowItWorksSectionTitle).toBeVisible();
        await expect(mainPage.getHowItWorksSectionTitle).toHaveText('Як створити вішліст на Wishpicks');
    });

    test('check blog page open and contain 4 blog items', async () => {
        await mainPage.getBlogButton.click();
        await helpers.checkItemsVisibleWithLen(mainPage.getBlogItems, 4);
        await helpers.checkItemsVisibleWithLen(mainPage.getBlogItemsImages, 4);
        await expect(mainPage.getBlogItemsImages.first()).toHaveAttribute('src', /\/_next\/image\?/);
    });

    test('create wishlist', async ({ page }) => {
        const dialogPopup = new DialogPopup(page);
        await mainPage.getCreateWishlistButton.click();
        await dialogPopup.checkWishlistCreatedAndAddWishPopupOpened();
    });
});

test.describe('Wishpicks spec', () => {
    test('create wishlist from all wishlists page', async ({ page }) => {
        const mainPage = new MainPage(page);
        const onboardingPopup = new OnboardingPopup(page);
        const dialogPopup = new DialogPopup(page);

        await mainPage.goToWishlistsPage();
        await onboardingPopup.checkAndClickCreateWishlistBtn();
        await dialogPopup.checkWishlistCreatedAndAddWishPopupOpened();
    });
});
