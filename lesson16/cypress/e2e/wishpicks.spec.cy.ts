import { mainPage } from '../page-objects/pages/main-page';
import { onboardingPopup } from '../page-objects/popups/onboarding-popup';
import { dialogPopup } from '../page-objects/popups/dialog-popup';

describe('Wishpicks main page spec', () => {
    beforeEach(() => {
        mainPage.visitMainWithCookies();
    });

    it('check anchor link to "How it works" header', function () {
        mainPage.getHowItWorksButton.should('be.visible').click();
        mainPage.getHowItWorksSectionTitle.should('be.visible').and('have.text', 'Як створити вішліст на Wishpicks');
    });

    it('check blog page open and contain 4 blog items', function () {
        mainPage.getBlogButton.click();
        mainPage.getBlogItems.should('be.visible').and('have.length', 4);
        mainPage.getBlogItemsImages.should('be.visible').and('have.length', 4).and('have.attr', 'src').should('contain', '/_next/image?');
    });

    it('create wishlist', function () {
        mainPage.getCreateWishlistButton.click();
        dialogPopup.checkWishlistCreatedAndAddWishPopupOpened();
    });
});
describe('Wishpicks spec', () => {
    it('create wishlist from all wishlists page', function () {
        mainPage.goToWishlistsPage();
        mainPage.acceptCookies();
        onboardingPopup.checkAndClickCreateWishlistBtn();
        dialogPopup.checkWishlistCreatedAndAddWishPopupOpened();
    });
});
