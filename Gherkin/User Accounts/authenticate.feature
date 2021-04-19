@smoke @atm
Feature: I can authenticate

  Scenario: I click on the 'Sign in' button
    Given I didn't filled 'Username' and/or 'Password' fields
    Then Each empty field is errored (red border) with a message stating the field is required

  Scenario: I click on the 'Sign in' button
    Given I did filled 'Username' and/or 'Password' fields
    And the user is not found or the password does not match
    Then  I am prompted with the 'The credential you provided do not match. Do you want to recover your password' (the latest being a link to the `Recover` page)

  Scenario: I click on the 'Sign in' button
    Given I did filled 'Username' and/or 'Password' fields
    And the password matches the user's
    Then the 'You have been authenticated' message will be displayed
    And the user will be redirected 0.5s later to the `contact` page
    And the user will be sent an email stating he authenticated
    And the user will not have to authenticate again for the next 3 months
