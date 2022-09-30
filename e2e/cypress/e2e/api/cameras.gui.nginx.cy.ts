import {nginxPath} from "../../support/e2e";

describe('NGINX Facing application tests', () => {

    beforeEach(() => {
        cy.visit(`${nginxPath}`);
    })

    it("should check all cameras", () => {
        cy.contains('Welcome to the Healthy Cameras Site (NGINX)').should('exist');
        cy.checkCameras();
    })

    it("should click all option menus", () => {
        cy.contains('Welcome to the Healthy Cameras Site (NGINX)').should('exist');
        cy.checkCameras();
        cy.clickOptionTabs();
    })

    it("should Log all cameras", () => {
        cy.contains('Welcome to the Healthy Cameras Site (NGINX)').should('exist');
        cy.checkCameras();
        cy.logAll();
    })

});