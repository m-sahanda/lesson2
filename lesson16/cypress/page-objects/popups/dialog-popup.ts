import { AddWishPopup } from './add-wish-popup';

export class DialogPopup extends AddWishPopup {
    private readonly popupLocator = '[id^="headlessui-dialog-panel"]';

    public get getPopup(): Cypress.Chainable {
        return cy.get(this.popupLocator);
    }
    public get getPopupText(): Cypress.Chainable {
        return cy.get(this.popupLocator).find('.items-start .space-y-2');
    }

    public get getCreateWishlistBtn(): Cypress.Chainable {
        return cy.get(this.popupLocator).find('.items-start .mt-5 [type="button"]:first-child');
    }

    public checkWishlistCreatedAndAddWishPopupOpened(): void {
        this.getPopupText.should('be.visible').and('contain.text', 'Ваш перший вішліст готовий! 🎉');
        this.getCreateWishlistBtn
            .should('have.css', 'background-color', 'oklch(0.511 0.262 276.966)')
            .should('have.text', 'Додати бажання')
            .click();
        this.getAddWishInput.should('be.visible').should('have.attr', 'placeholder', 'https:// або назва бажання');
    }
}

export const dialogPopup = new DialogPopup();
