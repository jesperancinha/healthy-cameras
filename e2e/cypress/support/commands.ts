/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import {authorizationRequest, withHeaders} from "./e2e";
import {stringify} from "querystring";

Cypress.Commands.add('loginBasicAuth', (path: string) => {
    cy.visit(path, {
        auth: {
            username: `cameraUser1`,
            password: `administrator`,
        },
    })
})

Cypress.Commands.add('loginHmacAuth', (path: string) => {
    const method = 'GET';
    let headers = createCamera2HmacHeaders(method, path);
    cy.visit(path, {
        method: method,
        headers: headers
    });
})

Cypress.Commands.add('loginJWT', (path: string) => {
    cy.fixture('CC3KongToken').then(data => {
        let kongToken = data.data[0];
        let secret = kongToken.secret;
        let key = kongToken.key;
        const token = jwt.sign(
            {
                algorithm: "HS256",
                type: "JWT",
            },
            secret,
            {
                issuer: key,
                expiresIn: "12h",
                algorithm: "HS256"
            });
        let headers = {
            "Authorization": `Bearer ${token}`
        };
        cy.intercept("*", withHeaders(headers))
        cy.visit(path, {
            method: "GET",
            headers: headers
        });
    });
})

Cypress.Commands.add("loginKey", (path: string) => {
    cy.fixture('CC4KongKeys').then(data => {
        const apikey = data.data[0].key
        return {
            apikey: apikey
        };
    }).then(headers => {
        cy.intercept("*", withHeaders(headers))
        cy.visit(path)
    });
})

Cypress.Commands.add('loginLDAP', (path: string) => {
    const credentials = btoa("admin:password");
    let headers = {
        "Authorization": `ldap ${credentials}`
    };
    cy.intercept("*", withHeaders(headers))
    cy.visit(path, {
        headers: headers
    });
})

Cypress.Commands.add('loginOauth2', (path: string) => {
    cy.fixture('CC6KongOauth2').then(appConfig => {
        cy.fixture('CC6KongProvOauth2').then(data => {
            let request = authorizationRequest(appConfig.client_id, 'email', data.config.provision_key);
            cy.log(stringify(request.form));
            let oauthHost = Cypress.config().baseUrl.split('http://')[1].split(':')[0];
            let oauth2AuthorizeUrl = `https://${oauthHost}:8443/camera-6-service/api/v1/hc/oauth2/authorize`;
            cy.request({
                url: oauth2AuthorizeUrl,
                method: 'POST',
                form: true,
                body: request.form,
                headers: request.headers
            }).then(response => {
                cy.log(stringify(response.body));
                cy.log(stringify(response.headers));
            })
            cy.request('POST', oauth2AuthorizeUrl, request.form).then(response => {
                cy.log(stringify(response.body));
                cy.log(stringify(response.headers));
            });
        });
    });

});

Cypress.on('uncaught:exception', (err) => {
    if (err.message && err.message.trim().length > 0 && err.name && err.name.trim().length > 0) {
        if (err.message.indexOf('setting getter-only property "data"') >= 0) {
            return false;
        }
        if (err.message.indexOf('Cannot read properties of null') >= 0) {
            return false;
        }
        if (err.message.indexOf('too much recursion') >= 0) {
            return false;
        }
        if (err.message.indexOf('The operation was aborted') >= 0) {
            return false;
        }
        if (err.message.indexOf('undefined') >= 0) {
            return false;
        }
    } else {
        return false;
    }
    return true;
})

export function createCamera2HmacHeaders(method: string, path: string): Partial<any> {
    const username = 'cameraUser2', secret = 'dragon', algorithm = 'hmac-sha256';
    const dateFormat = new Date().toUTCString();
    const digestBodyHeader = `SHA-256=${crypto.createHash('sha256').digest('base64')}`;
    const signingString = `x-date: ${dateFormat}\n${method} ${path} HTTP/1.1\ndigest: ${digestBodyHeader}`;
    const signature = crypto.createHmac('sha256', secret).update(signingString).digest('base64');
    const authorization = `hmac username="${username}", algorithm="${algorithm}", headers="x-date request-line digest", signature="${signature}"`;
    return {
        'Digest': digestBodyHeader,
        'Authorization': authorization,
        'X-Date': dateFormat,
        'Content-Type': 'application/json',
    };
}
