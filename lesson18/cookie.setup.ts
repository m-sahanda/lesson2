import { test as setup } from '@playwright/test';
import path from 'path';

const cookieFile = path.resolve('.auth/cookie.json');

setup('cookie', async ({ page }) => {
    await page.goto('https://wishpicks.com');
    await page.locator('#cookiescript_accept').click();

    await page.context().storageState({ path: cookieFile });
});
