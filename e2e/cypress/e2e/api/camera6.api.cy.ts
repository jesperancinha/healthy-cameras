import {applicationRootCamera6} from "../../support/e2e";

describe('Camera 6 API tests (OAuth2)', () => {

    before(() => {
        cy.loginOauth2(applicationRootCamera6);
    })

    it('should make a correct visit', () => {
        // cy.contains("Welcome to Healthy cameras!").should('exist');
    })

    it('should reload 10 times', () => {
        for (let i = 0; i < 10; i++) {
            // cy.reload();
            // cy.loginOauth2(applicationRootCamera6);
            // cy.contains('Welcome to Healthy cameras!').should('exist');
        }
    })

});
