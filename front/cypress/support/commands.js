Cypress.Commands.add('loginWith', ({ email, password }) =>
    cy.visit('localhost:3000')
        .get('#email')
        .type(email)
        .get('#password')
        .type(password)
        .get('#submit-btn')
        .click()
)
