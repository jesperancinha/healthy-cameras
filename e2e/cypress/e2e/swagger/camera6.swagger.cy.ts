import {applicationRootCamera1, applicationRootCamera6} from "../../support/e2e";

describe('Swagger tests spec for Camera 6', () => {

    before(() => {
        cy.loginOAuth2(`${applicationRootCamera6}/webjars/swagger-ui/index.html`);
    })

    it('passes', () => {
        let oauthHost = Cypress.config().baseUrl.split('http://')[1].split(':')[0];
        let oauth2AuthorizeUrl = `https://${oauthHost}:8443${applicationRootCamera6}/v3/api-docs`;
        cy.get('input[class="download-url-input"]').clear().type(oauth2AuthorizeUrl);
        cy.get('button').contains('Explore').click();
        cy.get('h2', {timeout: 10000}).contains('OpenAPI definition', {timeout: 10000}).should('not.be.null');
        cy.wait(1000);

        cy.get('div[class="servers"] > label > select > option').should('have.value', `http://localhost:8000${applicationRootCamera1}`);
    })
})
