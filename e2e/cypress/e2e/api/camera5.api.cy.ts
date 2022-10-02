import {
    applicationRootCamera4ConsumerId, applicationRootCamera4CredentialId, applicationRootCamera4UserId,
    applicationRootCamera5, applicationRootCamera5ConsumerId,
    applicationRootCamera5CredentialId, applicationRootCamera5UserId
} from "../../support/e2e";
import {createKeyHeder, createLDAPHeaders, findKeyCredential} from "../../support/commands";

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

    it('should read credential name', () => {
        cy.request({
            url: applicationRootCamera5CredentialId,
            headers: createLDAPHeaders()
        }).then(response => {
            console.log(JSON.stringify(response));
            expect(response.body).to.be.eq('admin');
        })
    })


    it('should read no user', () => {
        cy.request({
            url: applicationRootCamera5UserId,
            headers: createLDAPHeaders()
        }).then(response => {
            console.log(JSON.stringify(response));
            expect(response.body).to.be.eq('');
        })
    })

    it('should read no consumer', () => {
        cy.request({
            url: applicationRootCamera5ConsumerId,
            headers: createLDAPHeaders()
        }).then(response => {
            console.log(JSON.stringify(response));
            expect(response.body).to.be.eq('')
        })
    })
});
