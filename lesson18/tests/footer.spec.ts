import { test } from '../fixtures/fixture';

test.describe('footer', () => {
    test.beforeEach(async ({ mainPage }) => {
        await mainPage.goToHomePage();
    });

    test('change language btn visible in footer on main page', async ({ footer }) => {
        await footer.changeLanguageBtn.scrollIntoViewIfNeeded();
        await footer.assertFooterItemsVisible();
    });

    test('change language btn is visible in footer on blog page', async ({ mainPage, footer }) => {
        await mainPage.blogButton.click();
        await footer.changeLanguageBtn.scrollIntoViewIfNeeded();
        await footer.assertFooterItemsVisible();
    });

    test('change language btn is visible in footer on wishlists page', async ({ mainPage, footer }) => {
        await mainPage.goToWishlistsPage();
        await footer.changeLanguageBtn.scrollIntoViewIfNeeded();
        await footer.assertFooterItemsVisible();
    });
});
