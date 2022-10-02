import {
    applicationAuthAPI,
    applicationRootCamera6,
    applicationRootCamera6ConsumerId, applicationRootCamera6CredentialId,
    applicationRootCamera6UserId
} from "../../support/e2e";
import {loginAuthAPI} from "../../support/commands";


describe('Camera OAuth2 Tests', () => {

    beforeEach(() => {
        cy.visit(`${applicationAuthAPI}`);
    })

    it('should login and see welcome message', () => {
        cy.intercept('GET', "**/api/v1/cameras/auth/**").as("authentication")
        cy.get('input[placeholder="Username"]').type("admin");
        cy.get('input[placeholder="Password"]').type("admin");

        cy.get('button[type="submit"]').click();

        loginAuthAPI().then(response => {
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
    it('should login and see user', () => {
        cy.intercept('GET', "**/api/v1/cameras/auth/**").as("authentication")
        cy.get('input[placeholder="Username"]').type("admin");
        cy.get('input[placeholder="Password"]').type("admin");

        cy.get('button[type="submit"]').click();

        loginAuthAPI().then(response => {
            expect(response.status).to.be.eq(200);
            let authorizationCode = response.body.access_token;
            cy.log(authorizationCode);
            let camera6Endpoint = `${Cypress.config().baseUrl.replace("http", "https").replace("8000", "8443")}/${applicationRootCamera6UserId}`;
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

    it('should login and see consumer', () => {
        cy.intercept('GET', "**/api/v1/cameras/auth/**").as("authentication")
        cy.get('input[placeholder="Username"]').type("admin");
        cy.get('input[placeholder="Password"]').type("admin");

        cy.get('button[type="submit"]').click();

        loginAuthAPI().then(response => {
            expect(response.status).to.be.eq(200);
            let authorizationCode = response.body.access_token;
            cy.log(authorizationCode);
            let camera6Endpoint = `${Cypress.config().baseUrl.replace("http", "https").replace("8000", "8443")}/${applicationRootCamera6ConsumerId}`;
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
    it('should login and see credential', () => {
        cy.intercept('GET', "**/api/v1/cameras/auth/**").as("authentication")
        cy.get('input[placeholder="Username"]').type("admin");
        cy.get('input[placeholder="Password"]').type("admin");

        cy.get('button[type="submit"]').click();

        loginAuthAPI().then(response => {
            expect(response.status).to.be.eq(200);
            let authorizationCode = response.body.access_token;
            cy.log(authorizationCode);
            let camera6Endpoint = `${Cypress.config().baseUrl.replace("http", "https").replace("8000", "8443")}/${applicationRootCamera6CredentialId}`;
            cy.request(
                {
                    url: camera6Endpoint,
                    headers: {
                        "Authorization": `bearer ${authorizationCode}`
                    }
                }).then(response => {
                    cy.log(JSON.stringify(response));
                    expect(response.body).to.be.eq("CAMERA06CLIENTID")
            })
        })
    })
});