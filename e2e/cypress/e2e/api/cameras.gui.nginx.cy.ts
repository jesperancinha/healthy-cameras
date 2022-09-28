import {nginxPath} from "../../support/e2e";

describe('NGINX Facing application tests', () => {

    beforeEach(() => {
        cy.visit(`${nginxPath}`);
    })

    it("should check all cameras", ()=>{
        cy.contains('Welcome to the Healthy Cameras Site (NGINX)').should('exist');
        cy.get('mat-card-title').contains('Basic Auth').siblings().eq(0 ).contains('Camera is On').should('exist');
        cy.get('mat-card-title').contains('HMAC Auth').siblings().eq(0 ).contains('Camera is On').should('exist');
        cy.get('mat-card-title').contains('JWT Auth').siblings().eq(0 ).contains('Camera is On').should('exist');
        cy.get('mat-card-title').contains('ApiKey Auth').siblings().eq(0 ).contains('Camera is On').should('exist');
        cy.get('mat-card-title').contains('LDAP Auth').siblings().eq(0 ).contains('Camera is On').should('exist');
        cy.get('mat-card-title').contains('OAuth2 Auth').siblings().eq(0 ).contains('Camera is On').should('exist');
    })

});