import {When, Given, Then} from 'cypress-cucumber-preprocessor/steps'

When('I register with an empty field', () => {
    cy.visit('localhost:3000/signup')
        .get('#username')
        .type('random')
        .get('#password')
        .type('random')
        .get('#rep-password')
        .type('random')
        .get('#submit-btn')
        .click()
})

Then('the empty field should be errored with red border', () => {
    cy.get("#email").should('have.class', 'border-red-500')
})

Then('a warning alert is displayed', () => {
    cy.get('#warning-alert-box').should('exist')
})