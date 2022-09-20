import {applicationAuthAPI, applicationRootCamera6} from "../../support/e2e";
import exp = require("constants");

describe('Camera 6 API tests (OAuth2)', () => {

    beforeEach(() => {
        cy.visit(`${applicationAuthAPI}?response_type=code&client_id=CAMERA06CLIENTID&scope=admin&state=DUMMY&redirect_uri=http://localhost:8095/api/v1/cameras/client`);
    })

    it('should login and see welcome screen', () => {
        cy.intercept('GET', "**/api/v1/cameras/auth/**").as("authentication")
        cy.get('input[placeholder="Username"]').type("admin");
        cy.get('input[placeholder="Password"]').type("admin");

        cy.get('button[type="submit"]').click();
        cy.wait('@authentication').then(response => {
            expect(response.response.statusCode).to.be.eq(200);
            let authorizationCode = response.response.body.access_token;
            cy.log(authorizationCode);
            let camera6Endpoint = `${Cypress.config().baseUrl.replace("http", "https").replace("8000", "8443")}/${applicationRootCamera6}`;
            cy.request(
                {
                    url: camera6Endpoint,
                    headers: {
                        "Authorization": `bearer ${authorizationCode}`
                    }
                }).then(response => {
                    expect(response.body).to.contain("Welcome to Healthy cameras")
            })
        })
    })
});