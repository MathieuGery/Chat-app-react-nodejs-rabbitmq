import {When, Then} from 'cypress-cucumber-preprocessor/steps'

When('I register', () => {
    let result = [];
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    cy.registerWith({username: 'kjshfdkhsf', email: `${result.join('')}@outlook.com`, password: 'jojsdjfoisijfojid', cpassword: 'jojsdjfoisijfojid'})
})

Then('a success alert is displayed', () => {
    cy.get('#success-alert-box').should('exist')
})

Then('the url is {word}', (url) => {
    cy.url()
        .should('eq', `${Cypress.config().baseUrl}${url}`)
})