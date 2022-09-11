import {applicationRootCamera3} from "../../support/e2e";


describe('Camera 3 API tests', () => {

    before(() => {
        cy.loginJWT(applicationRootCamera3);
    })

    it('should make a correct visit', () => {
        cy.contains("Welcome to Healthy cameras!").should('exist');
    })

});
