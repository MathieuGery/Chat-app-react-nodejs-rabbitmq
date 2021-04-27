import {When, Then} from 'cypress-cucumber-preprocessor/steps'

When('I login with wrong credentials', () => {
    cy.loginWith({email: 'wrong@hotmail.fr', password: 'wrong'})
})

Then('the url is {word}', (url) => {
    cy.url()
        .should('eq', `${Cypress.config().baseUrl}${url}`)
})

Then('an error alert is displayed', () => {
    cy.get('#error-alert-box').should('exist')
})