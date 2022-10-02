import {
    applicationRootCamera1UserInfo,
    applicationRootCamera2,
    applicationRootCamera2UserInfo
} from "../../support/e2e";
import {createCamera2HmacHeaders} from "../../support/commands";


describe('Camera 2 API tests (HMAC)', () => {

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

    it('should read consumer name', () => {
        cy.request({
            url: applicationRootCamera2UserInfo,
            headers: createCamera2HmacHeaders("GET", applicationRootCamera2UserInfo)
        }).then(response => {
            console.log(JSON.stringify(response));
            expect(response.body).to.be.eq('camera2');
        })
    })
})
