import { Page, Locator } from '@playwright/test';
import { helpers } from '../../helpers/helpers';
import { expect } from '../../fixtures/fixture';

export class Footer {
    public constructor(private readonly page: Page) {}

    public get footer(): Locator {
        return this.page.locator('footer');
    }

    public get changeLanguageBtn(): Locator {
        return this.footer.locator('.relative button');
    }

    public get hrefItems(): Locator {
        return this.footer.locator('a');
    }

    public get categories(): Locator {
        return this.footer.locator('h3');
    }

    public async assertFooterItemsVisible(): Promise<void> {
        await this.footer.scrollIntoViewIfNeeded();

        const hasCategories = (await this.categories.count()) > 0;

        await helpers.checkItemsVisibleWithLen(this.hrefItems, hasCategories ? 17 : 4);

        await this.changeLanguageBtn.scrollIntoViewIfNeeded();

        await expect(this.changeLanguageBtn).toBeVisible();
    }
}
