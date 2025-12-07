import { test as base } from '@playwright/test';
import { MainPage } from '../src/page-objects/pages/main-page';
import { DialogPopup } from '../src/page-objects/popups/dialog-popup';
import { OnboardingPopup } from '../src/page-objects/popups/onboarding-popup';
import { AddWishPopup } from '../src/page-objects/popups/add-wish-popup';
import { Footer } from '../src/components/footer';
import { SideMenu } from '../src/components/side-menu';

interface Fixture {
    mainPage: MainPage;
    dialogPopup: DialogPopup;
    onboardingPopup: OnboardingPopup;
    addWishPopup: AddWishPopup;
    footer: Footer;
    sideMenu: SideMenu;
}

export const test = base.extend<Fixture>({
    mainPage: async ({ page }, use) => {
        await use(new MainPage(page));
    },
    dialogPopup: async ({ page }, use) => {
        await use(new DialogPopup(page));
    },
    onboardingPopup: async ({ page }, use) => {
        await use(new OnboardingPopup(page));
    },
    addWishPopup: async ({ page }, use) => {
        await use(new AddWishPopup(page));
    },
    footer: async ({ page }, use) => {
        await use(new Footer(page));
    },
    sideMenu: async ({ page }, use) => {
        await use(new SideMenu(page));
    }
});

export const expect = test.expect;
