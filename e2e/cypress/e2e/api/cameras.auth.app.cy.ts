import {applicationAuthAPI, applicationRootCamera6, applicationRootCamera6UserInfo} from "../../support/e2e";


describe('Camera OAuth2 Tests', () => {

    beforeEach(() => {
        cy.visit(`${applicationAuthAPI}`);
    })

    it('should login and see welcome message', () => {
        cy.intercept('GET', "**/api/v1/cameras/auth/**").as("authentication")
        cy.get('input[placeholder="Username"]').type("admin");
        cy.get('input[placeholder="Password"]').type("admin");

        cy.get('button[type="submit"]').click();

        cy.request({
            url: applicationAuthAPI,
            body: `username=admin&password=admin`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(response => {
            expect(response.status).to.be.eq(200);
            let authorizationCode = response.body.access_token;
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
    it('should login and see logged entity', () => {
        cy.intercept('GET', "**/api/v1/cameras/auth/**").as("authentication")
        cy.get('input[placeholder="Username"]').type("admin");
        cy.get('input[placeholder="Password"]').type("admin");

        cy.get('button[type="submit"]').click();

        cy.request({
            url: applicationAuthAPI,
            body: `username=admin&password=admin`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(response => {
            expect(response.status).to.be.eq(200);
            let authorizationCode = response.body.access_token;
            cy.log(authorizationCode);
            let camera6Endpoint = `${Cypress.config().baseUrl.replace("http", "https").replace("8000", "8443")}/${applicationRootCamera6UserInfo}`;
            cy.request(
                {
                    url: camera6Endpoint,
                    headers: {
                        "Authorization": `bearer ${authorizationCode}`
                    }
                }).then(response => {
                    cy.log(JSON.stringify(response));
                    expect(response.body).to.be.eq("camera6")
            })
        })
    })
});