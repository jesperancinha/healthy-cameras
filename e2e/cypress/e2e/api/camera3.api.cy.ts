import {applicationRootCamera3} from "../../support/e2e";

/**
 * When running `make dcup-full-action` at the root of the project, a file called `CC3KongToken.json` will be created as a fixture.
 * From here two elements will be extracted from the first element of the data array:
 *
 * `key`: used as the Issuer Id
 * `secret`: used to generate the signature.
 *
 * For camera 3 we will not be using private and public keys.
 * This demonstrates that we can also send JWT tokens without using private key ciphering and public key validation.
 * This is a less secure way of using JWT tokens to access the application when comparing to using private/public keys.
 */
describe('Camera 3 API tests (JWT)', () => {

    before(() => {
        cy.loginJWT(applicationRootCamera3);
    })

    it('should make a correct visit', () => {
        cy.contains("Welcome to Healthy cameras!").should('exist');
    })

    it('should reload 10 times', () => {
        for (let i = 0; i < 10; i++) {
            cy.loginJWT(applicationRootCamera3);
            cy.contains('Welcome to Healthy cameras!').should('exist');
        }
    })

});
