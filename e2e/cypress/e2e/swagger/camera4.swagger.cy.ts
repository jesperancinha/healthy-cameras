import {applicationRootCamera1, applicationRootCamera4} from "../../support/e2e";

describe('Swagger tests spec for Camera 4', () => {

    before(() => {
        cy.loginKey(`${applicationRootCamera4}/webjars/swagger-ui/index.html`);
    })

    it('passes', () => {
        cy.get('input[class="download-url-input"]').clear().type(`${Cypress.config().baseUrl}${applicationRootCamera4}/v3/api-docs`);
        cy.get('button').contains('Explore').click();
        cy.contains('OpenAPI definition', {timeout: 10000}).should('not.be.null');
        cy.wait(1000);

        cy.get('div[class="servers"] > label > select > option').should('have.value', `http://localhost:8000${applicationRootCamera4}`);
    })
})
