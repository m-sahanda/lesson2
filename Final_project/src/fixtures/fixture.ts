import {test as base} from '@playwright/test';
import {MainPage} from '../pages/main-page';
import {PlaywrightApiService} from '../../services/playwright-api.service';
import {ApiConstructor} from '../api/api-constructor';
import {IncomesPage} from '../pages/incomes-page';
import {ExpensesPage} from '../pages/expenses-page';
import * as fs from 'fs';
import path from 'node:path';


interface Fixture {
    mainPage: MainPage;
    apiStorageState: string;
    apiLoggedInMainPage: MainPage;
    apiService: PlaywrightApiService;
    uiLoggedInMainPage: MainPage;
    apiConstructor: ApiConstructor;
    incomesPage: IncomesPage;
    expensesPage: ExpensesPage;
}

const storageStatePath = (type: string): string => `.auth/${type}-storage-state.json`;

export const test = base.extend<Fixture>({

    apiStorageState: async ({}, use) => {
        const authFile = storageStatePath('api');
        await getStorageStateFile(authFile);
        await use(authFile);
    },

    context: async ({ browser, apiStorageState }, use) => {
        const context = await browser.newContext({ storageState: apiStorageState });
        await use(context);
        await context.close();
    },

    mainPage: async ({ page }, use) => {
        await use(new MainPage(page));
    },

    incomesPage: async ({ page }, use) => {
        await use(new IncomesPage(page));
    },

    expensesPage: async ({ page }, use) => {
        await use(new ExpensesPage(page));
    },

    apiService: async ({ apiStorageState }, use) => {
        await use(new PlaywrightApiService(apiStorageState));
    },

    apiConstructor: async ({ apiService }, use) => {
        await use(new ApiConstructor(apiService));
    }
});

export const expect = test.expect;

async function getStorageStateFile(authFile: string): Promise<void> {
    if (!fs.existsSync(authFile)) {
        const login = process.env.LOGIN;
        const password = process.env.PASSWORD;

        const tempApiService = new PlaywrightApiService();
        const loginResponse = await tempApiService.post('/api/react/authenticate/login', {
            username: login,
            password: password
        });

        if (loginResponse.status() !== 200) {
            const body = await loginResponse.text();
            throw new Error(`Login failed with status ${loginResponse.status()}: ${body}`);
        }

        const storageState = await tempApiService.getStorageState();
        const dir = path.dirname(authFile);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(authFile, JSON.stringify(storageState));
    }
}
