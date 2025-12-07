import { test, expect } from '../fixtures/fixture';
import { helpers } from '../helpers/helpers';

test.describe('side menu', () => {
    test.beforeEach(async ({ mainPage, dialogPopup }) => {
        await mainPage.goToWishlistsPage();
        await dialogPopup.closePopup();
    });

    test('should be visible side menu and have 5 items', async ({ sideMenu }) => {
        await expect(sideMenu.menuBlock).toBeVisible();
        await helpers.checkItemsVisibleWithLen(sideMenu.menuItems, 5);
    });

    test('click on menu menu and page should be changed', async ({ sideMenu, page, footer }) => {
        await sideMenu.menuItems.nth(1).click();
        await expect(sideMenu.menuBlock).toBeVisible();
        await helpers.checkItemsVisibleWithLen(sideMenu.menuItems, 5);
        await expect(page).not.toHaveURL(/\/wishlists$/);
        await footer.assertFooterItemsVisible();
    });
    test('click on another menu item and utl should be changed', async ({ sideMenu, page, footer }) => {
        await sideMenu.menuItems.nth(3).click();
        await expect(sideMenu.menuBlock).toBeVisible();
        await helpers.checkItemsVisibleWithLen(sideMenu.menuItems, 5);
        await expect(page).not.toHaveURL(/\/wishlists$/);
        await footer.assertFooterItemsVisible();
    });
});
