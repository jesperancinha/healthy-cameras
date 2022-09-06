describe('Graphite Tests', () => {
    const host = Cypress.env('graphiteHost') ? Cypress.env('graphiteHost') : 'localhost';
    const port = 8085

    it('show graphite', () => {
        cy.visit(`http://${host}:${port}`);
    });

})
