import {applicationRootCamera1, applicationRootCamera3, withHeaders} from "../../support/e2e";

describe('Swagger tests spec for Camera 1', () => {

    before(() => {
        cy.loginJWT(`${applicationRootCamera3}/webjars/swagger-ui/index.html`);
    })

    it('passes', () => {
        cy.get('input[class="download-url-input"]').clear().type(`${Cypress.config().baseUrl}${applicationRootCamera3}/v3/api-docs`);
        cy.get('button').contains('Explore').click();
        cy.get('h2', {timeout: 10000}).contains('OpenAPI definition', {timeout: 10000}).should('not.be.null');
        cy.wait(1000);

        cy.get('div[class="servers"] > label > select > option').should('have.value', `http://localhost:8000${applicationRootCamera1}`);
    })
})
