import {
    applicationAuthAPI,
    applicationRootCamera6,
    applicationRootCamera6AccessPoint,
    applicationRootCamera6AccessPointAdmin,
    applicationRootCamera6AccessPointObserver, applicationRootCamera6AccessPointVistor,
    applicationRootCamera6ConsumerId,
    applicationRootCamera6CredentialId,
    applicationRootCamera6Headers,
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

    it('should login and see all headers for admin', () => {
        cy.intercept('GET', "**/api/v1/cameras/auth/**").as("authentication")
        cy.get('input[placeholder="Username"]').type("admin");
        cy.get('input[placeholder="Password"]').type("admin");
        cy.get('button[type="submit"]').click();

        loginAuthAPI().then(response => {
            expect(response.status).to.be.eq(200);
            let authorizationCode = response.body.access_token;
            cy.log(authorizationCode);
            let camera6Endpoint = `${Cypress.config().baseUrl.replace("http", "https").replace("8000", "8443")}/${applicationRootCamera6Headers}`;
            cy.request(
                {
                    url: camera6Endpoint,
                    headers: {
                        "Authorization": `bearer ${authorizationCode}`
                    }
                }).then(response => {
                cy.log(JSON.stringify(response));
                cy.log(JSON.stringify(response.requestHeaders));
                const allHeaders = response.body;
                cy.log(JSON.stringify(allHeaders));
                cy.fixture('CC6KongOauth2').then(appConfig => {
                    expect(allHeaders["x-consumer-username"]).to.be.eq("camera6");
                    expect(allHeaders["x-consumer-id"]).to.be.eq(appConfig.consumer.id);
                    expect(allHeaders["x-credential-identifier"]).to.be.eq('CAMERA06CLIENTID');
                    expect(allHeaders["x-authenticated-scope"]).to.be.eq('admin');
                    expect(allHeaders["x-authenticated-userid"]).to.be.eq('camera6');
                });
            })
            camera6Endpoint = `${Cypress.config().baseUrl.replace("http", "https").replace("8000", "8443")}/${applicationRootCamera6AccessPointAdmin}`;
            cy.request(
                {
                    url: camera6Endpoint,
                    headers: {
                        "Authorization": `bearer ${authorizationCode}`
                    }
                }).then(response => {
                cy.log(JSON.stringify(response));
                expect(response.body).to.be.eq("This is the info for users with scope admin.")
            })
            camera6Endpoint = `${Cypress.config().baseUrl.replace("http", "https").replace("8000", "8443")}/${applicationRootCamera6AccessPointObserver}`;
            cy.request(
                {
                    url: camera6Endpoint,
                    headers: {
                        "Authorization": `bearer ${authorizationCode}`
                    },
                    failOnStatusCode: false
                }).then(response => {
                cy.log(JSON.stringify(response));
                expect(response.status).to.be.eq(401);
            })

        })
    })

    it('should login and see all headers for officer', () => {
        cy.intercept('GET', "**/api/v1/cameras/auth/**").as("authentication")
        cy.get('input[placeholder="Username"]').type("officer");
        cy.get('input[placeholder="Password"]').type("admin");
        cy.get('button[type="submit"]').click();

        loginAuthAPI().then(response => {
            expect(response.status).to.be.eq(200);
            let authorizationCode = response.body.access_token;
            cy.log(authorizationCode);
            let camera6Endpoint = `${Cypress.config().baseUrl.replace("http", "https").replace("8000", "8443")}/${applicationRootCamera6Headers}`;
            cy.request(
                {
                    url: camera6Endpoint,
                    headers: {
                        "Authorization": `bearer ${authorizationCode}`
                    }
                }).then(response => {
                cy.log(JSON.stringify(response));
                cy.log(JSON.stringify(response.requestHeaders));
                const allHeaders = response.body;
                cy.log(JSON.stringify(allHeaders));
                cy.fixture('CC6KongOauth2').then(appConfig => {
                    expect(allHeaders["x-consumer-username"]).to.be.eq("camera6");
                    expect(allHeaders["x-consumer-id"]).to.be.eq(appConfig.consumer.id);
                    expect(allHeaders["x-credential-identifier"]).to.be.eq('CAMERA06CLIENTID');
                    expect(allHeaders["x-authenticated-scope"]).to.be.eq('observer');
                    expect(allHeaders["x-authenticated-userid"]).to.be.eq('camera6');
                });
            })
            camera6Endpoint = `${Cypress.config().baseUrl.replace("http", "https").replace("8000", "8443")}/${applicationRootCamera6AccessPointObserver}`;
            cy.request(
                {
                    url: camera6Endpoint,
                    headers: {
                        "Authorization": `bearer ${authorizationCode}`
                    }
                }).then(response => {
                cy.log(JSON.stringify(response));
                expect(response.body).to.be.eq("This is the info for users with scope observer.")
            })
            camera6Endpoint = `${Cypress.config().baseUrl.replace("http", "https").replace("8000", "8443")}/${applicationRootCamera6AccessPointAdmin}`;
            cy.request(
                {
                    url: camera6Endpoint,
                    headers: {
                        "Authorization": `bearer ${authorizationCode}`
                    },
                    failOnStatusCode: false
                }).then(response => {
                cy.log(JSON.stringify(response));
                expect(response.status).to.be.eq(401);
            })

        })
    })

    it('should login and see all headers for edwin', () => {
        cy.intercept('GET', "**/api/v1/cameras/auth/**").as("authentication")
        cy.get('input[placeholder="Username"]').type("edwin");
        cy.get('input[placeholder="Password"]').type("admin");
        cy.get('button[type="submit"]').click();

        loginAuthAPI().then(response => {
            expect(response.status).to.be.eq(200);
            let authorizationCode = response.body.access_token;
            cy.log(authorizationCode);
            let camera6Endpoint = `${Cypress.config().baseUrl.replace("http", "https").replace("8000", "8443")}/${applicationRootCamera6Headers}`;
            cy.request(
                {
                    url: camera6Endpoint,
                    headers: {
                        "Authorization": `bearer ${authorizationCode}`
                    }
                }).then(response => {
                cy.log(JSON.stringify(response));
                cy.log(JSON.stringify(response.requestHeaders));
                const allHeaders = response.body;
                cy.log(JSON.stringify(allHeaders));
                cy.fixture('CC6KongOauth2').then(appConfig => {
                    expect(allHeaders["x-consumer-username"]).to.be.eq("camera6");
                    expect(allHeaders["x-consumer-id"]).to.be.eq(appConfig.consumer.id);
                    expect(allHeaders["x-credential-identifier"]).to.be.eq('CAMERA06CLIENTID');
                    expect(allHeaders["x-authenticated-scope"]).to.be.eq('visitor');
                    expect(allHeaders["x-authenticated-userid"]).to.be.eq('camera6');
                });
            })
            camera6Endpoint = `${Cypress.config().baseUrl.replace("http", "https").replace("8000", "8443")}/${applicationRootCamera6AccessPointVistor}`;
            cy.request(
                {
                    url: camera6Endpoint,
                    headers: {
                        "Authorization": `bearer ${authorizationCode}`
                    }
                }).then(response => {
                cy.log(JSON.stringify(response));
                expect(response.body).to.be.eq("This is the info for users with scope visitor.")
            });
        })
    })

    it('should login and see all headers for johannes', () => {
        cy.intercept('GET', "**/api/v1/cameras/auth/**").as("authentication")
        cy.get('input[placeholder="Username"]').type("johannes");
        cy.get('input[placeholder="Password"]').type("admin");
        cy.get('button[type="submit"]').click();

        loginAuthAPI().then(response => {
            expect(response.status).to.be.eq(200);
            let authorizationCode = response.body.access_token;
            cy.log(authorizationCode);
            let camera6Endpoint = `${Cypress.config().baseUrl.replace("http", "https").replace("8000", "8443")}/${applicationRootCamera6Headers}`;
            cy.request(
                {
                    url: camera6Endpoint,
                    headers: {
                        "Authorization": `bearer ${authorizationCode}`
                    }
                }).then(response => {
                cy.log(JSON.stringify(response));
                cy.log(JSON.stringify(response.requestHeaders));
                const allHeaders = response.body;
                cy.log(JSON.stringify(allHeaders));
                cy.fixture('CC6KongOauth2').then(appConfig => {
                    expect(allHeaders["x-consumer-username"]).to.be.eq("camera6");
                    expect(allHeaders["x-consumer-id"]).to.be.eq(appConfig.consumer.id);
                    expect(allHeaders["x-credential-identifier"]).to.be.eq('CAMERA06CLIENTID');
                    expect(allHeaders["x-authenticated-scope"]).to.be.eq('researcher');
                    expect(allHeaders["x-authenticated-userid"]).to.be.eq('camera6');
                });
            })

        })
    })

    it('should login and see all headers for lucy', () => {
        cy.intercept('GET', "**/api/v1/cameras/auth/**").as("authentication")
        cy.get('input[placeholder="Username"]').type("lucy");
        cy.get('input[placeholder="Password"]').type("admin");
        cy.get('button[type="submit"]').click();

        loginAuthAPI().then(response => {
            expect(response.status).to.be.eq(200);
            let authorizationCode = response.body.access_token;
            cy.log(authorizationCode);
            let camera6Endpoint = `${Cypress.config().baseUrl.replace("http", "https").replace("8000", "8443")}/${applicationRootCamera6Headers}`;
            cy.request(
                {
                    url: camera6Endpoint,
                    headers: {
                        "Authorization": `bearer ${authorizationCode}`
                    }
                }).then(response => {
                cy.log(JSON.stringify(response));
                cy.log(JSON.stringify(response.requestHeaders));
                const allHeaders = response.body;
                cy.log(JSON.stringify(allHeaders));
                cy.fixture('CC6KongOauth2').then(appConfig => {
                    expect(allHeaders["x-consumer-username"]).to.be.eq("camera6");
                    expect(allHeaders["x-consumer-id"]).to.be.eq(appConfig.consumer.id);
                    expect(allHeaders["x-credential-identifier"]).to.be.eq('CAMERA06CLIENTID');
                    expect(allHeaders["x-authenticated-scope"]).to.be.eq('researcher');
                    expect(allHeaders["x-authenticated-userid"]).to.be.eq('camera6');
                });
            })

        })
    })
});