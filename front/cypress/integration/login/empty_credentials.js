import {When, Given, Then} from 'cypress-cucumber-preprocessor/steps'

When('I login with an empty field', () => {
    cy.visit('localhost:3000')
        .get('#password')
        .type("random_password")
        .get('#submit-btn')
        .click()
})

Then('the empty field should be errored with red border', () => {
    cy.get("#email").should('have.class', 'border-red-500')
})

Then('a warning alert is displayed', () => {
    cy.get('#warning-alert-box').should('exist')
})