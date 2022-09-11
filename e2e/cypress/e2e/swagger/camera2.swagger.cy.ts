import {applicationRootCamera2} from "../../support/e2e";
import {createCamera2HmacHeaders} from "../../support/commands";

describe('Swagger tests spec for Camera 2', () => {

    before(() => {
        cy.loginHmacAuth(`${applicationRootCamera2}/webjars/swagger-ui/index.html`);
    })

    it('should make correct swagger JSON API request', () => {
        const url = `${applicationRootCamera2}/v3/api-docs`;
        cy.request({
            url: url,
            headers: createCamera2HmacHeaders("GET", url)
        }).then(response => {
            expect(response.status).to.be.eq(200);
            expect(response.body).not.to.be.null;
        })
    })
})

