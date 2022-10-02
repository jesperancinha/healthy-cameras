import {
    applicationRootCamera2ConsumerId, applicationRootCamera3CredentialId, applicationRootCamera3UserId,
    applicationRootCamera4,
    applicationRootCamera4ConsumerId, applicationRootCamera4CredentialId, applicationRootCamera4UserId
} from "../../support/e2e";
import {
    createCamera2HmacHeaders,
    createJWTToken,
    createKeyHeder,
    findJWTCredential,
    findKeyCredential
} from "../../support/commands";

/**
 * When running `make dcup-full-action` at the root of the project, a file called `CC4KongKeys.json` will be created as a fixture.
 * From here, the key in the data of the first element will be extracted and used to access the application
 */
describe('Camera 4 API tests (KEY)', () => {

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

    it('should read consumer name', () => {
        createKeyHeder().then(headers => {
            cy.request({
                url: applicationRootCamera4ConsumerId ,
                headers:headers
            }).then(response => {
                console.log(JSON.stringify(response));
                expect(response.body).to.be.eq('camera4');
            })
        })
    })

    it('should read no user', () => {
        createKeyHeder().then(headers => {
            cy.request({
                method: 'GET',
                url: applicationRootCamera4UserId,
                headers: headers
            }).then(response => {
                console.log(JSON.stringify(response));
                expect(response.body).to.be.eq('');
            })
        })
    })

    it('should read credential', () => {
        createKeyHeder().then(headers => {
            cy.request({
                url: applicationRootCamera4CredentialId,
                headers: headers,
            }).then(response => {
                console.log(JSON.stringify(response));
                findKeyCredential()
                    .then(credential => expect(response.body).to.be.eq(credential))
            })
        })
    })
});
