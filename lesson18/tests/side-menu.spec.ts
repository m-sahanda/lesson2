import { test, expect } from '../fixtures/fixture';
import { helpers } from '../helpers/helpers';

test.describe('side menu', () => {
    test.beforeEach(async ({ mainPage, dialogPopup }) => {
        await mainPage.goToWishlistsPage();
        await dialogPopup.closePopup();
    });

    test('should be visible side menu and have 5 items', async ({ mainPage }) => {
        await expect(mainPage.sideMenu.menuBlock).toBeVisible();
        await helpers.checkItemsVisibleWithLen(mainPage.sideMenu.menuItems, 5);
    });

    test('click on menu menu and page should be changed', async ({ page, mainPage }) => {
        await mainPage.sideMenu.menuItems.nth(1).click();
        await expect(mainPage.sideMenu.menuBlock).toBeVisible();
        await helpers.checkItemsVisibleWithLen(mainPage.sideMenu.menuItems, 5);
        await expect(page).not.toHaveURL(/\/wishlists$/);
        await mainPage.footer.assertFooterItemsVisible();
    });
    test('click on another menu item and utl should be changed', async ({ page, mainPage }) => {
        await mainPage.sideMenu.menuItems.nth(3).click();
        await expect(mainPage.sideMenu.menuBlock).toBeVisible();
        await helpers.checkItemsVisibleWithLen(mainPage.sideMenu.menuItems, 5);
        await expect(page).not.toHaveURL(/\/wishlists$/);
        await mainPage.footer.assertFooterItemsVisible();
    });
});
