import { test } from '../fixtures/fixture';

test.describe('footer', () => {
    test.beforeEach(async ({ mainPage }) => {
        await mainPage.goToHomePage();
    });

    test('change language btn visible in footer on main page', async ({ mainPage }) => {
        await mainPage.footer.changeLanguageBtn.scrollIntoViewIfNeeded();
        await mainPage.footer.assertFooterItemsVisible();
    });

    test('change language btn is visible in footer on blog page', async ({ mainPage }) => {
        await mainPage.blogButton.click();
        await mainPage.footer.changeLanguageBtn.scrollIntoViewIfNeeded();
        await mainPage.footer.assertFooterItemsVisible();
    });

    test('change language btn is visible in footer on wishlists page', async ({ mainPage }) => {
        await mainPage.goToWishlistsPage();
        await mainPage.footer.changeLanguageBtn.scrollIntoViewIfNeeded();
        await mainPage.footer.assertFooterItemsVisible();
    });
});
