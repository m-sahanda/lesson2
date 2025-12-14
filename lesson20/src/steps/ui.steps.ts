import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

const footer = 'footer';

Given<CustomWorld>('I open the Wishpicks homepage', async function () {
    const base = this.parameters.baseURL || 'https://wishpicks.com';
    await this.page.goto(base, { waitUntil: 'domcontentloaded' });
});

Then<CustomWorld>('every footer link should have non-empty href', async function () {
    const links = await this.page.locator('footer a').all();

    for (const link of links) {
        if ((await link.textContent()) === 'Налаштування cookie') continue;

        await expect(link).toHaveAttribute('href');
    }
});

When<CustomWorld>('I click footer link {string}', async function (linkText: string) {
    const link = this.page.locator('footer').getByRole('link', { name: linkText, exact: false }).first();

    await link.click();
});

When<CustomWorld>('I click the visible footer logo', async function () {
    const logoLink = this.page
        .locator(footer)
        .getByRole('link', { name: /Wishpicks Logo/i })
        .first();
    await logoLink.scrollIntoViewIfNeeded();
    await logoLink.click();
});

Then<CustomWorld>('the path should be {string}', async function (expected: string) {
    await expect(this.page).toHaveURL(`${this.parameters.baseURL}/uk${expected}`);
});
