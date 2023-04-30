describe('Grafana Tests', () => {
    const host = Cypress.env('grafanaHost') ? Cypress.env('grafanaHost') : 'localhost';
    const port = 3000

    it('show grafana', () => {
        cy.visit(`http://${host}:${port}`);
        cy.get("h1").contains("Grafana").should('exist');
        cy.get('input[aria-label="Username input field"]').type("admin");
        cy.get('input[aria-label="Password input field"]').type("admin");
        cy.get('button[aria-label="Login button"]').click();
        cy.get('input[name="newPassword"]').then($body => {
            cy.get('input[name="newPassword"]').type("admin");
            cy.get('input[name="confirmNew"]').type("admin");
        });
        cy.get('button[type = "submit"]').click();
        cy.reload()
        cy.get('div[class="grafana-app"] > main[class="main-view"] > div > div').get('button[aria-label="Toggle menu"]').click()
        // cy.get('a[aria-label="Dashboards"]', {timeout: 10000}).click();
        cy.get('a[href="/dashboards"]', {timeout: 10000}).click();
    });

})
