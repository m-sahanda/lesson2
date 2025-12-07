import { test, expect } from '../fixtures/fixture';
import { helpers } from '../helpers/helpers';

test.describe('Wishpicks main page spec with fixtures', () => {
    test.beforeEach(async ({ mainPage }) => {
        await mainPage.goToHomePage();
    });

    test('check anchor link to "How it works" header', async ({ mainPage }) => {
        await expect(mainPage.howItWorksButton).toBeVisible();

        await mainPage.howItWorksButton.click();

        await expect(mainPage.howItWorksSectionTitle).toBeVisible();
        await expect(mainPage.howItWorksSectionTitle).toHaveText('Як створити вішліст на Wishpicks');
    });

    test('check blog page open and contain 4 blog items', async ({ mainPage }) => {
        await mainPage.blogButton.click();

        await helpers.checkItemsVisibleWithLen(mainPage.blogItems, 4);
        await helpers.checkItemsVisibleWithLen(mainPage.blogItemsImages, 4);
        await expect(mainPage.blogItemsImages.first()).toHaveAttribute('src', /\/_next\/image\?/);
    });

    test('create wishlist', async ({ mainPage, dialogPopup, addWishPopup }) => {
        await mainPage.createWishlistButton.click();
        await dialogPopup.checkWishlistCreatedAndAddWishPopupOpened();

        await expect(addWishPopup.addWishInput).toBeVisible();
        await expect(addWishPopup.addWishInput).toHaveAttribute('placeholder', 'https:// або назва бажання');
    });
});

test.describe('Wishpicks spec with fixtures', () => {
    test('create wishlist from all wishlists page', async ({ mainPage, onboardingPopup, dialogPopup }) => {
        await mainPage.goToWishlistsPage();
        await onboardingPopup.checkAndClickCreateWishlistBtn();
        await dialogPopup.checkWishlistCreatedAndAddWishPopupOpened();
    });
});
