// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

export function noCacheHandler() {
    return (request) => {
        request.auth = {
            username: `cameraUser1`,
            password: `administrator`,
        }
        request.on('before:response', (response) => {
            response.headers['cache-control'] = 'no-store'
        })
    }
}

export function withHeaders(headers) {
    return (request) => {
        request.headers = headers
    }
}

export function withFormAndHeaders(req) {
    return (request) => {
        request.headers = req.headers;
        request.form = true;
        request.body = {
            form: req.form
        };
    }
}

const applicationRoot = '/api/v1/hc';
const userId = '/userid';
const consumerId = '/consumerid';
const credentialId = '/credentialid';
const headers = '/headers';
const scopes = '/scopes';
const scopeAdmin = '/admin';
const scopeObserver = '/observer';
const scopeVisitor = '/visitor';
const scopeResearcher = '/researcher'
const sanitizePrePath = (prePath: string) => `${Cypress.config().baseUrl.endsWith("8000") ? prePath : ""}`;
export const rootPath: string = "";
export const nginxPath: string = `http://${Cypress.env('nginxHost') ? Cypress.env('nginxHost') : 'localhost:8090'}/`;
export const applicationRootCamera1: string = `${sanitizePrePath("/camera-1-service")}${applicationRoot}`;
export const applicationRootCamera1UserId: string = `${sanitizePrePath("/camera-1-service")}${applicationRoot}${userId}`;
export const applicationRootCamera1ConsumerId: string = `${sanitizePrePath("/camera-1-service")}${applicationRoot}${consumerId}`;
export const applicationRootCamera1CredentialId: string = `${sanitizePrePath("/camera-1-service")}${applicationRoot}${credentialId}`;
export const applicationRootCamera2: string = `${sanitizePrePath("/camera-2-service")}${applicationRoot}`;
export const applicationRootCamera2UserId: string = `${sanitizePrePath("/camera-2-service")}${applicationRoot}${userId}`;
export const applicationRootCamera2ConsumerId: string = `${sanitizePrePath("/camera-2-service")}${applicationRoot}${consumerId}`;
export const applicationRootCamera2CredentialId: string = `${sanitizePrePath("/camera-2-service")}${applicationRoot}${credentialId}`;
export const applicationRootCamera3: string = `${sanitizePrePath("/camera-3-service")}${applicationRoot}`;
export const applicationRootCamera3UserId: string = `${sanitizePrePath("/camera-3-service")}${applicationRoot}${userId}`;
export const applicationRootCamera3ConsumerId: string = `${sanitizePrePath("/camera-3-service")}${applicationRoot}${consumerId}`;
export const applicationRootCamera3CredentialId: string = `${sanitizePrePath("/camera-3-service")}${applicationRoot}${credentialId}`;
export const applicationRootCamera4: string = `${sanitizePrePath("/camera-4-service")}${applicationRoot}`;
export const applicationRootCamera4UserId: string = `${sanitizePrePath("/camera-4-service")}${applicationRoot}${userId}`;
export const applicationRootCamera4ConsumerId: string = `${sanitizePrePath("/camera-4-service")}${applicationRoot}${consumerId}`;
export const applicationRootCamera4CredentialId: string = `${sanitizePrePath("/camera-4-service")}${applicationRoot}${credentialId}`;
export const applicationRootCamera5: string = `${sanitizePrePath("/camera-5-service")}${applicationRoot}`;
export const applicationRootCamera5UserId: string = `${sanitizePrePath("/camera-5-service")}${applicationRoot}${userId}`;
export const applicationRootCamera5ConsumerId: string = `${sanitizePrePath("/camera-5-service")}${applicationRoot}${consumerId}`;
export const applicationRootCamera5CredentialId: string = `${sanitizePrePath("/camera-5-service")}${applicationRoot}${credentialId}`;
export const applicationRootCamera6: string = `${sanitizePrePath("/camera-6-service")}${applicationRoot}`;
export const applicationRootCamera6UserId: string = `${sanitizePrePath("/camera-6-service")}${applicationRoot}${userId}`;
export const applicationRootCamera6ConsumerId: string = `${sanitizePrePath("/camera-6-service")}${applicationRoot}${consumerId}`;
export const applicationRootCamera6CredentialId: string = `${sanitizePrePath("/camera-6-service")}${applicationRoot}${credentialId}`;
export const applicationRootCamera6AccessPointAdmin: string = `${sanitizePrePath("/camera-6-service")}${applicationRoot}${scopes}/${scopeAdmin}`;
export const applicationRootCamera6AccessPointObserver: string = `${sanitizePrePath("/camera-6-service")}${applicationRoot}${scopes}/${scopeObserver}`;
export const applicationRootCamera6AccessPointVistor: string = `${sanitizePrePath("/camera-6-service")}${applicationRoot}${scopes}/${scopeVisitor}`;
export const applicationRootCamera6AccessPointResearcher: string = `${sanitizePrePath("/camera-6-service")}${applicationRoot}${scopes}/${scopeResearcher}`;
export const applicationRootCamera6Headers: string = `${sanitizePrePath("/camera-6-service")}${applicationRoot}${headers}`;
export const applicationAuthAPI: string = '/cameras-auth-service/api/v1/cameras/auth/login'

Cypress.on('uncaught:exception', (err, runnable) => {
        cy.log(err.message);
        return true;
});
