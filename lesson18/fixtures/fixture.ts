import { test as base } from '@playwright/test';
import { MainPage } from '../page-objects/pages/main-page';
import { DialogPopup } from '../page-objects/popups/dialog-popup';
import { OnboardingPopup } from '../page-objects/popups/onboarding-popup';
import { AddWishPopup } from '../page-objects/popups/add-wish-popup';

interface Fixture {
    mainPage: MainPage;
    dialogPopup: DialogPopup;
    onboardingPopup: OnboardingPopup;
    addWishPopup: AddWishPopup;
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
    }
});

export const expect = test.expect;
