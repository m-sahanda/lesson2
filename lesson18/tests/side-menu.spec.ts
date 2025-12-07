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

    test('click on menu and page should be changed', async ({ sideMenu, footer }) => {
        await sideMenu.menuItems.nth(1).click();
        await sideMenu.assertMenuItemsCount();
        await footer.assertFooterItemsVisible();
    });
    test('click on another menu item and url should be changed', async ({ sideMenu, footer }) => {
        await sideMenu.menuItems.nth(3).click();
        await sideMenu.assertMenuItemsCount();
        await footer.assertFooterItemsVisible();
    });
});
