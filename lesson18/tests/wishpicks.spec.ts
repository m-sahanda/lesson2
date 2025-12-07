import { test, expect } from '@playwright/test';
import { MainPage } from '../src/page-objects/pages/main-page';
import { DialogPopup } from '../src/page-objects/popups/dialog-popup';
import { OnboardingPopup } from '../src/page-objects/popups/onboarding-popup';
import { helpers } from '../helpers/helpers';

test.describe('Wishpicks main page spec', () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.visitMainWithCookies();
    });

    test('check anchor link to "How it works" header', async () => {
        await expect(mainPage.howItWorksButton).toBeVisible();
        await mainPage.howItWorksButton.click();
        await expect(mainPage.howItWorksSectionTitle).toBeVisible();
        await expect(mainPage.howItWorksSectionTitle).toHaveText('Як створити вішліст на Wishpicks');
    });

    test('check blog page open and contain 4 blog items', async () => {
        await mainPage.blogButton.click();
        await helpers.checkItemsVisibleWithLen(mainPage.blogItems, 4);
        await helpers.checkItemsVisibleWithLen(mainPage.blogItemsImages, 4);
        await expect(mainPage.blogItemsImages.first()).toHaveAttribute('src', /\/_next\/image\?/);
    });

    test('create wishlist', async ({ page }) => {
        const dialogPopup = new DialogPopup(page);
        await mainPage.createWishlistButton.click();
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
