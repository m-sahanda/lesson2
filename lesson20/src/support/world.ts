import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from 'playwright';

export interface CustomWorldParameters {
    baseURL: string;
}

export class CustomWorld extends World {
    public browser!: Browser;
    public context!: BrowserContext;
    public page!: Page;
    public parameters: CustomWorldParameters;

    public constructor(options: IWorldOptions) {
        super(options);
        const p = options?.parameters || {};
        this.parameters = {
            baseURL: p.baseURL ?? 'https://wishpicks.com'
        };
    }
}

setWorldConstructor(CustomWorld);
