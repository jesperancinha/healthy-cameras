import {applicationRootCamera4} from "../../support/e2e";

/**
 * When running `make dcup-full-action` at the root of the project, a file called `CC4KongKeys.json` will be created as a fixture.
 * From here, the key in the data of the first element will be extracted and used to access the application
 */
describe('Camera 3 API tests', () => {

    before(() => {
        cy.loginKey(applicationRootCamera4);
    })

    it('should make a correct visit', () => {
        cy.contains("Welcome to Healthy cameras!").should('exist');
    })

    it('should reload 10 times', () => {
        for (let i = 0; i < 10; i++) {
            cy.reload();
            cy.loginKey(applicationRootCamera4);
            cy.contains('Welcome to Healthy cameras!').should('exist');
        }
    })

});
