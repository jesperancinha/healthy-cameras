import {
    applicationRootCamera4ConsumerId,
    applicationRootCamera5,
    applicationRootCamera5CredentialId
} from "../../support/e2e";
import {createKeyHeder, createLDAPHeaders} from "../../support/commands";

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

    it('should read consumer name', () => {
        createKeyHeder().then(headers => {
            cy.request({
                url: applicationRootCamera5CredentialId,
                headers: createLDAPHeaders()
            }).then(response => {
                console.log(JSON.stringify(response));
                expect(response.body).to.be.eq('admin');
            })
        })
    })

});
