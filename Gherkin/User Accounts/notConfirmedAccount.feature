@smoke @atm
Feature:  I cannot connect if I have not confirmed my account

Scenario: I click on 'sign-in' button
  Given I've filled the 'Username' and 'Password'
  Given 'Username' and 'Password' are correct
  Given Account is not validated yet by the user
  Then I am prompted with a 'Your account has not yet been confirmed'
  And An email with another confirmation link will be resent, with a 24h lifespan.