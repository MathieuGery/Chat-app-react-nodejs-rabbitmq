import {When, Then} from 'cypress-cucumber-preprocessor/steps'

When('I login', () => {
    cy.loginWith({email: 'gregoire.lanfranchini@epitech.eu', password: 'Gregoire2%='})
})

Then('a success alert is displayed', () => {
    cy.get('#success-alert-box').should('exist')
})

Then('the url is {word}', (url) => {
    cy.url()
        .should('eq', `${Cypress.config().baseUrl}${url}`)
})

Then('I\'m logged', () => {
    cy.getCookie('jwt').should('exist')
})