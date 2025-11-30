import { test, expect } from '../fixtures/fixture';
import { helpers } from '../helpers/helpers';

test.describe('Wishpicks main page spec with fixtures', () => {
    test.beforeEach(async ({ mainPage }) => {
        await mainPage.goToHomePage();
    });

    test('check anchor link to "How it works" header', async ({ mainPage }) => {
        await expect(mainPage.getHowItWorksButton).toBeVisible();

        await mainPage.getHowItWorksButton.click();

        await expect(mainPage.getHowItWorksSectionTitle).toBeVisible();
        await expect(mainPage.getHowItWorksSectionTitle).toHaveText('Як створити вішліст на Wishpicks');
    });

    test('check blog page open and contain 4 blog items', async ({ mainPage }) => {
        await mainPage.getBlogButton.click();

        await helpers.checkItemsVisibleWithLen(mainPage.getBlogItems, 4);
        await helpers.checkItemsVisibleWithLen(mainPage.getBlogItemsImages, 4);
        await expect(mainPage.getBlogItemsImages.first()).toHaveAttribute('src', /\/_next\/image\?/);
    });

    test('create wishlist', async ({ mainPage, dialogPopup, addWishPopup }) => {
        await mainPage.getCreateWishlistButton.click();
        await dialogPopup.checkWishlistCreatedAndAddWishPopupOpened();

        await expect(addWishPopup.getAddWishInput).toBeVisible();
        await expect(addWishPopup.getAddWishInput).toHaveAttribute('placeholder', 'https:// або назва бажання');
    });
});

test.describe('Wishpicks spec with fixtures', () => {
    test('create wishlist from all wishlists page', async ({ mainPage, onboardingPopup, dialogPopup }) => {
        await mainPage.goToWishlistsPage();
        await onboardingPopup.checkAndClickCreateWishlistBtn();
        await dialogPopup.checkWishlistCreatedAndAddWishPopupOpened();
    });
});
