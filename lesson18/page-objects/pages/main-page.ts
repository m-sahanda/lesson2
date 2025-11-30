import { Page, Locator } from '@playwright/test';

export class MainPage {
    public constructor(private readonly page: Page) {}

    public async goToHomePage(): Promise<void> {
        await this.page.goto('/');
    }

    public async goToWishlistsPage(): Promise<void> {
        await this.page.goto('/uk/wishlists');
    }

    public async acceptCookiesIfPresent(): Promise<void> {
        const btn = this.page.locator('#cookiescript_accept');
        if (await btn.isVisible().catch(() => false)) {
            await btn.click();
        }
    }

    public async visitMainWithCookies(): Promise<void> {
        await this.goToHomePage();
        await this.acceptCookiesIfPresent();
    }

    public get getHowItWorksButton(): Locator {
        return this.page.locator('a[href="#how-it-works"]');
    }

    public get getHowItWorksSectionTitle(): Locator {
        return this.page.locator('#how-it-works h2.font-header');
    }

    public get getBlogButton(): Locator {
        return this.page.locator('[href="/uk/blog"]');
    }

    public get getBlogItems(): Locator {
        return this.page.locator('.group .cursor-pointer');
    }

    public get getBlogItemsImages(): Locator {
        return this.getBlogItems.locator('img');
    }

    public get getCreateWishlistButton(): Locator {
        return this.page.locator('.relative.z-10 .mt-10 button');
    }
}
