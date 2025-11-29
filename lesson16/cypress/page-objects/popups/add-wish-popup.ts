export class AddWishPopup {
    public get getAddWishInput(): Cypress.Chainable {
        return cy.get('.relative.mt-2 input');
    }
}
