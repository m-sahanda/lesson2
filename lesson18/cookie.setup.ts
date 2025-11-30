import { test as setup } from '@playwright/test';
import path from 'path';

const cookieFile = path.resolve('.auth/cookie.json');

setup('cookie', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto('https://wishpicks.com');
    await page.locator('#cookiescript_accept').click();

    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    // await page.waitForURL('https://wishpicks.com');
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    // await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

    // End of authentication steps.

    await page.context().storageState({ path: cookieFile });
});
