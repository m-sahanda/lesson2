import { Locator, Page } from '@playwright/test';

export class SideMenu {
    public constructor(public readonly page: Page) {}

    public get menuBlock(): Locator {
        return this.page.locator('[class="pb-[env(safe-area-inset-bottom)]"]');
    }

    public get menuItems(): Locator {
        return this.menuBlock.locator('a');
    }
}
