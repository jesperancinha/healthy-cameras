import {applicationRootCamera1} from "../../support/e2e";

describe('Camera 1 API tests', () => {

    before(() => {
        cy.loginBasicAuth(applicationRootCamera1);
    })

    it('should make a correct visit', () => {
        cy.contains("Welcome to Healthy cameras!").should('exist');
    })

    it('should reload 10 times', () => {
        for (let i = 0; i < 10; i++) {
            cy.reload();
            cy.contains('Welcome to Healthy cameras!').should('exist');
        }
    })
})
