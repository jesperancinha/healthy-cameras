import {applicationRootCamera2} from "../../support/e2e";
import {createCamera2HmacHeaders} from "../../support/commands";
import exp = require("constants");

describe('Camera 2 API tests', () => {

    before(() => {
        cy.loginHmacAuth(applicationRootCamera2);
    })

    it('should make a correct visit', () => {
        cy.contains("Welcome to Healthy cameras!").should('exist');
    })

    it('should reload 10 times and fail', () => {
        for (let i = 0; i < 10; i++) {
            cy.reload(createCamera2HmacHeaders("GET", applicationRootCamera2));
            cy.contains('Unauthorized').should('exist');
        }
    })

    it('should GET correctly 10 times', () => {
        for (let i = 0; i < 10; i++) {
            cy.request({
                url: applicationRootCamera2,
                headers: createCamera2HmacHeaders("GET", applicationRootCamera2)
            }).then(response => {
                expect(response.status).to.be.eq(200);
                expect(response.body).to.contain("Welcome to Healthy cameras!");
            })
        }
    })
})
