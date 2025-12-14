import { Locator, Page } from '@playwright/test';
import { expect } from '../../fixtures/fixture';
import { helpers } from '../../helpers/helpers';

export class SideMenu {
    public constructor(public readonly page: Page) {}

    public get menuBlock(): Locator {
        return this.page.locator('[class="pb-[env(safe-area-inset-bottom)]"]');
    }

    public get menuItems(): Locator {
        return this.menuBlock.locator('a');
    }

    public async assertMenuItemsCount(): Promise<void> {
        await expect(this.menuBlock).toBeVisible();
        await helpers.checkItemsVisibleWithLen(this.menuItems, 5);
        await expect(this.page).not.toHaveURL(/\/wishlists$/);
    }
}
