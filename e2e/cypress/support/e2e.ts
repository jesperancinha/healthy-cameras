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

const applicationRoot = '/api/v1/hc'
const userInfo = '/userid'
const consumerInfo = '/consumerid'
const sanitizePrePath = (prePath: string) => `${Cypress.config().baseUrl.endsWith("8000") ? prePath : ""}`;
export const rootPath: string = "";
export const nginxPath: string = `http://${Cypress.env('nginxHost') ? Cypress.env('nginxHost') : 'localhost:8090'}/`;
export const applicationRootCamera1: string = `${sanitizePrePath("/camera-1-service")}${applicationRoot}`;
export const applicationRootCamera1UserInfo: string = `${sanitizePrePath("/camera-1-service")}${applicationRoot}${consumerInfo}`;
export const applicationRootCamera2: string = `${sanitizePrePath("/camera-2-service")}${applicationRoot}`;
export const applicationRootCamera2UserInfo: string = `${sanitizePrePath("/camera-2-service")}${applicationRoot}${consumerInfo}`;
export const applicationRootCamera3: string = `${sanitizePrePath("/camera-3-service")}${applicationRoot}`;
export const applicationRootCamera3UserInfo: string = `${sanitizePrePath("/camera-3-service")}${applicationRoot}${consumerInfo}`;
export const applicationRootCamera4: string = `${sanitizePrePath("/camera-4-service")}${applicationRoot}`;
export const applicationRootCamera5: string = `${sanitizePrePath("/camera-5-service")}${applicationRoot}`;
export const applicationRootCamera6: string = `${sanitizePrePath("/camera-6-service")}${applicationRoot}`;
export const applicationRootCamera6UserInfo: string = `${sanitizePrePath("/camera-6-service")}${applicationRoot}${userInfo}`;
export const applicationAuthAPI: string = '/cameras-auth-service/api/v1/cameras/auth/'
