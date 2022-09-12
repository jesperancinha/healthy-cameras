import {applicationRootCamera5} from "../../support/e2e";

describe('Camera 5 API tests (LDAP)', () => {

    before(() => {
        cy.loginLDAP(applicationRootCamera5);
    })

    it('should make a correct visit', () => {
        cy.contains("Welcome to Healthy cameras!").should('exist');
    })

    it('should reload 10 times', () => {
        for (let i = 0; i < 10; i++) {
            cy.reload();
            cy.loginLDAP(applicationRootCamera5);
            cy.contains('Welcome to Healthy cameras!').should('exist');
        }
    })

});
