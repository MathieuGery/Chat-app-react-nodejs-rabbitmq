import {When, Then} from 'cypress-cucumber-preprocessor/steps'

When('I register with a mail which don\'t has arobase', () => {
    cy.registerWith({username: 'kjshfdkhsf', email: 'wrongly_formatted_outlook.com', password: 'jojsdjfoisijfojid', cpassword: 'jojsdjfoisijfojid'})
})

Then('the empty field should be errored with red border', () => {
    cy.get("#email").should('have.class', 'border-red-500')
})

Then('an error alert is displayed', () => {
    cy.get('#error-alert-box').should('exist')
})