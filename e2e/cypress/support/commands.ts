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

Cypress.Commands.add('loginBasicAuth', (path: string) => {
    cy.visit(path, {
        auth: {
            username: `cameraUser1`,
            password: `administrator`,
        },
    })
})

Cypress.Commands.add('loginHmacAuth', (path: string) => {
    const method = 'GET'
    let headers = createCamera2HmacHeaders(method, path);
    cy.visit(path, {
        method: method,
        headers: headers
    });
})

Cypress.on('uncaught:exception', (err, runnable) => {
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
