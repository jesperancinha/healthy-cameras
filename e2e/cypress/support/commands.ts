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
import {applicationAuthAPI, withHeaders} from "./e2e";
import {stringify} from "querystring";

const basicAuth = 'Basic Auth';
const hmacAuth = 'HMAC Auth';
const jwtAuth = 'JWT Auth';
const apiKeyAuth = 'ApiKey Auth';
const ldapAuth = 'LDAP Auth';
const oAuth2Auth = 'OAuth2 Auth';

Cypress.Commands.add('loginBasicAuth', (path: string) => {
    cy.visit(path, {
        method: 'GET',
        headers: createBasicHeaders()
    });
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
    createJWTToken().then(headers => {
        cy.intercept("*", withHeaders(headers))
        cy.visit(path, {
            method: "GET",
            headers: headers
        });
    })
})

Cypress.Commands.add("loginKey", (path: string) => {
    createKeyHeder().then(headers => {
        cy.intercept("*", withHeaders(headers))
        cy.visit(path)
    });
})

Cypress.Commands.add('loginLDAP', (path: string) => {
    let headers = createLDAPHeaders();
    cy.intercept("*", withHeaders(headers))
    cy.visit(path, {
        headers: headers
    });
})

Cypress.Commands.add('loginOAuth2ByProvisionKey', (path: string) => {
    cy.fixture('CC6KongOauth2').then(appConfig => {
        cy.fixture('CC6KongProvOauth2').then(data => {
            let oauthHost = Cypress.config().baseUrl.split('http://')[1].split(':')[0];
            let oauth2AuthorizeUrl = `https://${oauthHost}:8443/camera-6-service/api/v1/hc/oauth2/authorize`;
            cy.request({
                url: oauth2AuthorizeUrl,
                method: 'POST',
                form: true,
                body: {
                    client_id: `${appConfig.client_id}`,
                    scope: 'admin',
                    provision_key: `${data.config.provision_key}`,
                    authenticated_userid: "camera6",
                    response_type: 'code',
                },
                headers: {
                    Host: 'localhost'
                }
            }).then(response => {
                cy.log(stringify(response.body));
                cy.log(stringify(response.headers));

                cy.request({
                    method: 'POST',
                    url: `https://${oauthHost}:8443/camera-6-service/api/v1/hc/oauth2/token`,
                    body: {
                        client_id: appConfig.client_id,
                        client_secret: 'CAMERA06CLIENTSECRET',
                        provision_key: data.config.provision_key,
                        authenticated_userid: 'CC6',
                        scope: "admin",
                        grant_type: 'password',
                    },
                    form: true,
                }).then(endResponse => {
                    cy.intercept('*', withHeaders({
                        'Authorization': `Bearer ${endResponse.body.access_token}`,
                    }))
                    cy.visit(`https://${oauthHost}:8443${path}`)
                });
            });
        });
    });
});

Cypress.Commands.add('loginOAuth2ByAccessCode', (path: string) => {
    cy.fixture('CC6KongOauth2').then(appConfig => {
        cy.fixture('CC6KongProvOauth2').then(data => {
            let oauthHost = Cypress.config().baseUrl.split('http://')[1].split(':')[0];
            let oauth2AuthorizeUrl = `https://${oauthHost}:8443/camera-6-service/api/v1/hc/oauth2/authorize`;
            cy.request({
                url: oauth2AuthorizeUrl,
                method: 'POST',
                form: true,
                body: {
                    client_id: `${appConfig.client_id}`,
                    scope: 'admin',
                    provision_key: `${data.config.provision_key}`,
                    authenticated_userid: "camera6",
                    response_type: 'code',
                },
                headers: {
                    Host: 'localhost'
                }
            }).then(response => {
                cy.log(stringify(response.body));
                cy.log(stringify(response.headers));

                cy.request({
                    method: 'POST',
                    url: `https://${oauthHost}:8443/camera-6-service/api/v1/hc/oauth2/token`,
                    body: {
                        client_id: appConfig.client_id,
                        client_secret: 'CAMERA06CLIENTSECRET',
                        authenticated_userid: 'CC6',
                        scope: "admin",
                        grant_type: 'authorization_code',
                        code: response.body.redirect_uri.toString().split("?")[1].split('=')[1],
                    },
                    form: true,
                }).then(endResponse => {
                    cy.intercept('*', withHeaders({
                        'Authorization': `Bearer ${endResponse.body.access_token}`,
                    }))
                    cy.visit(`https://${oauthHost}:8443${path}`)
                });
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

Cypress.Commands.add('inputOnCamera', (camera: string, name: string, value: string) => {
    cy.get('mat-card-title').contains(camera).siblings().find(`input[name="${name}"]`).type(value);
});

Cypress.Commands.add('sendRequest', (camera: string) => {
    cy.get('mat-card-title').contains(camera).siblings().find('button').contains('Send Request').click();
});

Cypress.Commands.add('isCameraOn', (camera: string) => {
    cy.get('mat-card-title').contains(camera).siblings().eq(0).contains('Camera is On');
});

Cypress.Commands.add('checkCameras', () => {
    cy.isCameraOn(basicAuth);
    cy.isCameraOn(hmacAuth);
    cy.isCameraOn(jwtAuth);
    cy.isCameraOn(apiKeyAuth);
    cy.isCameraOn(ldapAuth);
    cy.isCameraOn(oAuth2Auth);
});

Cypress.Commands.add('clickOptionTabs', () => {
    cy.get('button').contains('Main').click();
    cy.get('button').contains('StatsD').click();
    cy.get('button').contains('Control').click();
    cy.get('button').contains('Overview').click();
});

Cypress.Commands.add('logAll', () => {
    cy.sendRequest(basicAuth);
    cy.sendRequest(hmacAuth);

    cy.fixture('CC3KongToken').then(data => {
        let kongToken = data.data[0];
        let secret = kongToken.secret;
        let key = kongToken.key;
        cy.inputOnCamera(jwtAuth, 'jwt-secret', secret)
        cy.inputOnCamera(jwtAuth, 'jwt-issuer', key)
        cy.sendRequest(jwtAuth);

    });

    cy.fixture('CC4KongKeys').then(data => {
        const apikey = data.data[0].key
        cy.inputOnCamera(apiKeyAuth, 'key-key', apikey)
        cy.sendRequest(apiKeyAuth);
    });

    cy.sendRequest(ldapAuth);
    cy.sendRequest(oAuth2Auth);
});


export function createCamera2HmacHeaders(method: string, path: string): Partial<any> {
    const username = 'cameraUser2', secret = 'dragon', algorithm = 'hmac-sha256';
    const currentDateTimeUtc = new Date().toUTCString();
    const digestBodyHeader = `SHA-256=${crypto.createHash('sha256').digest('base64')}`;
    const signingString = `x-date: ${currentDateTimeUtc}\n${method} ${path} HTTP/1.1\ndigest: ${digestBodyHeader}`;
    const signature = crypto.createHmac('sha256', secret).update(signingString).digest('base64');
    const authorization = `hmac username="${username}", algorithm="${algorithm}", headers="x-date request-line digest", signature="${signature}"`;
    return {
        'Digest': digestBodyHeader,
        'Authorization': authorization,
        'X-Date': currentDateTimeUtc,
        'Content-Type': 'application/json',
    };
}

export const findKeyCredential = () => cy.fixture('CC4KongKeys').then(data => data.data[0].id)

export const createKeyHeder = () => cy.fixture('CC4KongKeys').then(data => {
    const apikey = data.data[0].key
    return {
        apikey: apikey
    };
});

export const findJWTCredential = () => cy.fixture('CC3KongToken').then(data => data.data[0].key)

export const createJWTToken = () => cy.fixture('CC3KongToken').then(data => {
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
    return {
        "Authorization": `Bearer ${token}`
    }
});

export function createBasicHeaders() {
    const credentials = btoa("cameraUser1:administrator");
    return {
        "Authorization": `basic ${credentials}`
    };
}
export function createLDAPHeaders() {
    const credentials = btoa("admin:password");
    return {
        "Authorization": `ldap ${credentials}`
    };
}

export const loginAuthAPI = () => cy.request({
    url: applicationAuthAPI,
    body: `username=admin&password=admin`,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
});
