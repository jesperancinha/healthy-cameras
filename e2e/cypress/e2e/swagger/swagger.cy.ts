describe('Swagger tests spec', () => {

    before(()=>{
        cy.loginSwagger();
    })

    it('passes', () => {
        cy.get('input[class="download-url-input"]').clear().type(`${Cypress.config().baseUrl}/api/v1/hc/v3/api-docs`);
        cy.get('button').contains('Explore').click();
        cy.get('h2', {timeout: 10000}).contains('OpenAPI definition', {timeout: 10000}).should('not.be.null');
        cy.wait(1000);

        cy.get('div[class="servers"] > label > select > option').should('have.value', `http://localhost:8000/${Cypress.config().baseUrl.split("/")[3]}/api/v1/hc`);
    })
})

export function noCacheHandler(){
    return(request) => {
        request.auth = {
                username: `cameraUser1`,
                password: `administrator`,
        }
        request.on('before:response', (response) => {
            response.headers['cache-control'] = 'no-store'
        })
    }
}