export class OnboardingPopup {
    public get getPopup(): Cypress.Chainable {
        return cy.get('[id^="headlessui-dialog-panel"]');
    }

    public get getCreateWishlistBtn(): Cypress.Chainable {
        return cy.get('[id^="headlessui-dialog-panel"] a[href="/uk/wishlist/new?referralInfo=wishlists_onboarding"]');
    }

    public checkAndClickCreateWishlistBtn = (): void => {
        this.getPopup.should('be.visible');
        this.getCreateWishlistBtn
            .scrollIntoView()
            .should('be.visible')
            .should('have.text', 'Створити перший вішліст')
            .should('have.css', 'background-color', 'oklch(0.511 0.262 276.966)')
            .click();
    };
}

export const onboardingPopup = new OnboardingPopup();
