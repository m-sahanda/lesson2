import { expect, Locator } from '@playwright/test';

export class Helpers {
    public async checkItemsVisibleWithLen(items: Locator, itemsCount: number): Promise<void> {
        await expect(items).toHaveCount(itemsCount);
        const itemsArray = await items.all();
        for (const item of itemsArray) {
            await expect(item).toBeVisible();
        }
    }
}

export const helpers = new Helpers();
