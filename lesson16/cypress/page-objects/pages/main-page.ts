export class MainPage {
    public goToHomePage(): void {
        cy.visit(Cypress.env('BASE_URL'));
    }

    public goToWishlistsPage(): void {
        cy.visit(`${Cypress.env('BASE_URL')}/uk/wishlists`);
    }

    public acceptCookies(): void {
        cy.get('#cookiescript_accept').should('be.visible').click();
    }

    public visitMainWithCookies(): void {
        this.goToHomePage();
        this.acceptCookies();
    }

    public get getHowItWorksButton(): Cypress.Chainable {
        return cy.get('a[href="#how-it-works"]');
    }

    public get getHowItWorksSectionTitle(): Cypress.Chainable {
        return cy.get('#how-it-works h2.font-header');
    }

    public get getBlogButton(): Cypress.Chainable {
        return cy.get('[href="/uk/blog"]');
    }

    public get getBlogItems(): Cypress.Chainable {
        return cy.get('.group .cursor-pointer');
    }

    public get getBlogItemsImages(): Cypress.Chainable {
        return this.getBlogItems.find('img');
    }

    public get getCreateWishlistButton(): Cypress.Chainable {
        return cy.get('.relative.z-10 .mt-10 button');
    }
}

export const mainPage = new MainPage();
