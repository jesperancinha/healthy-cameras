describe('Prometheus Tests', () => {
    const host = Cypress.env('prometheusHost') ? Cypress.env('prometheusHost') : 'localhost';
    const port = 9090;

    it('show prometheus', () => {
        cy.visit(`http://${host}:${port}`);
        cy.get('a').contains("Prometheus").should('exist');
    });
})
