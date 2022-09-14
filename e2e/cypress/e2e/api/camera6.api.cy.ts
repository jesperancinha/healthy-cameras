import {applicationRootCamera6} from "../../support/e2e";

describe('Camera 6 API tests (OAuth2)', () => {

    it('should make a correct visit with provision key', () => {
        cy.loginOAuth2ByProvisionKey(applicationRootCamera6);
        cy.contains("Welcome to Healthy cameras!").should('exist');
    })

    it('should reload 10 times with provision key', () => {
        for (let i = 0; i < 10; i++) {
            cy.loginOAuth2ByProvisionKey(applicationRootCamera6);
            cy.contains('Welcome to Healthy cameras!').should('exist');
        }
    })

    it('should make a correct visit with access code', () => {
        cy.loginOAuth2ByAccessCode(applicationRootCamera6);
        cy.contains("Welcome to Healthy cameras!").should('exist');
    })

    it('should reload 10 times with access code', () => {
        for (let i = 0; i < 10; i++) {
            cy.loginOAuth2ByAccessCode(applicationRootCamera6);
            cy.contains('Welcome to Healthy cameras!').should('exist');
        }
    })

});
