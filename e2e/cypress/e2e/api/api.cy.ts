import {repeat} from "rxjs";

describe('API tests', () => {

    before(()=>{
        cy.login();
    })

    it('should reload 10 times', () => {
        for (let i = 0; i < 10; i++) {
            cy.reload()
        }
    })
})
