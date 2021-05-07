import {When, Then} from 'cypress-cucumber-preprocessor/steps'

When('I register with a mail already used', () => {
    cy.registerWith({username: 'kjshfdkhsf', email: 'already_used@outlook.com', password: 'jojsdjfoisijfojid', cpassword: 'jojsdjfoisijfojid'})
})

Then('the email field should be errored with red border', () => {
    cy.get("#email").should('have.class', 'border-red-500')
})