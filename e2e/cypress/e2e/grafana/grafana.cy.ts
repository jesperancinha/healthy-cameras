describe('Grafana Tests', () => {
    const host = Cypress.env('grafanaHost') ? Cypress.env('grafanaHost') : 'localhost';
    const port = 3000

    it('show grafana', () => {
        cy.visit(`http://${host}:${port}`);
        cy.get("h1").contains("Grafana").should('exist');
        cy.get('input[name="user"]').type("admin");
        cy.get('input[name="password"]').type("admin");
        cy.get('button[type="submit"]').click();
        cy.get('input[name="newPassword"]').then(() => {
            cy.get('input[name="newPassword"]').type("admin");
            cy.get('input[name="confirmNew"]').type("admin");
        });
        cy.get('button[type = "submit"]').click();
        cy.reload()
        // cy.get('div[class="grafana-app"] > main[class="main-view"] > div > div').get('button[aria-label="Toggle menu"]').click()
        cy.get('button[id="mega-menu-toggle"]').click({multiple: true})
        // cy.get('a[aria-label="Dashboards"]', {timeout: 10000}).click();
        cy.get('a[href="/dashboards"]', {timeout: 10000}).eq(0).click({force:true});
    });

})
