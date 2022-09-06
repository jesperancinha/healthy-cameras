describe('empty spec', () => {
    it('passes', () => {
        cy.visit(`/api/v1/hc/webjars/swagger-ui/index.html`);
        cy.get('input[class="download-url-input"]').clear().type(`${Cypress.config().baseUrl}/api/v1/hc/v3/api-docs`);
        cy.get('button').contains('Explore').click();
        cy.get('h2', {timeout: 10000}).contains('OpenAPI definition', {timeout: 10000}).should('not.be.null');
        cy.wait(1000);

        cy.get('div[class="servers"] > label > select > option').should('have.value', `${Cypress.config().baseUrl}/api/v1/hc`);
    })
})