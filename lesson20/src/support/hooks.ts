import { After, AfterAll, Before, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { CustomWorld } from './world';

let sharedBrowser: import('playwright').Browser;

setDefaultTimeout(20_000);

BeforeAll(async function () {
    sharedBrowser = await chromium.launch({
        headless: process.env.HEADLESS !== 'false'
    });
});

AfterAll(async function () {
    await sharedBrowser?.close();
});

Before<CustomWorld>(async function () {
    this.browser = sharedBrowser;
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

After<CustomWorld>(async function () {
    await this.page?.close();
    await this.context?.close();
});
