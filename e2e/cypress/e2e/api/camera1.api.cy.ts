import {applicationRootCamera1, applicationRootCamera1ConsumerId} from "../../support/e2e";

describe('Camera 1 API tests (Basic Auth)', () => {

    before(() => {
        cy.loginBasicAuth(applicationRootCamera1);
    })

    it('should make a correct visit', () => {
        cy.contains("Welcome to Healthy cameras!").should('exist');
    })

    it('should reload 10 times', () => {
        for (let i = 0; i < 10; i++) {
            cy.reload();
            cy.contains('Welcome to Healthy cameras!').should('exist');
        }
    })
    it('should read consumer name', () => {
        cy.request({
            method:'GET',
            url: applicationRootCamera1ConsumerId,
            headers: {
                'Content-Type': 'application/text',
                'Authorization': `Basic ${btoa("cameraUser1:administrator")}`
            },
        }).then(response => {
            console.log(JSON.stringify(response));
            expect(response.body).to.be.eq('camera1');
        })
    })
})
