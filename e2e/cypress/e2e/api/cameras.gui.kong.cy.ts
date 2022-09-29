import {rootPath} from "../../support/e2e";

describe('Kong Facing application tests', () => {

    beforeEach(() => {
        cy.visit(`${rootPath}`);
    })

    it("should check all cameras", ()=>{
        cy.contains('Welcome to the Healthy Cameras Site (Kong)').should('exist');
        cy.checkCameras();
    })

    it("should click all option menus", ()=>{
        cy.contains('Welcome to the Healthy Cameras Site (Kong)').should('exist');
        cy.checkCameras();
        cy.clickOptionTabs();
    })

    it("should Log all cameras", ()=>{
        cy.contains('Welcome to the Healthy Cameras Site (Kong)').should('exist');
        cy.checkCameras();
        cy.logAll();
    })

});