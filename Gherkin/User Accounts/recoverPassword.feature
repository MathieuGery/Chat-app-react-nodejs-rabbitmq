@smoke @atm
Feature: I can recover my password

  Scenario: I click on the 'Recover my password' button
    Given I didn't fill in the 'email' field
    Then The empty field is errored (red border) with a message stating the field is required

  Scenario: I click on the 'Recover my password' button
    Given I filled 'email' field
    Then I am prompted with the 'A recover email has been sent to this email. Please follow the instructions in it to recover your account'

  Scenario: I click on the 'Recover my password' button
    Given I filled 'email' field
    And The user is not found
    Then Nothing happens, no email is sent

  Scenario: I click on the 'Recover my password' button
    Given I filled 'email' field
    And The user is found
    Then An email is sent with a link which will expire after 24h OR after a successful login on that account, whichever comes first

  Scenario: I click on the confirmation button of the 'Reset' page
    Given I didn't fill in the 'Password' and/or the 'Password confirmation' fields
    Then Each empty field is errored (red border) with a message stating that the field is required

  Scenario: I click on the confirmation button of the 'Reset' page
    Given I filled 'Password' and 'Password confirmation' fields
    And The two passwords did not match
    Then The two fields are errored (red border) with a message stating that the passwords must match

  Scenario: I click on the confirmation button of the 'Reset' page
    Given I filled 'Password' and 'Password confirmation' fields
    And The two passwords matches
    Then I am prompted with the 'Your password has been successfully reset'
    And The user will be redirected 1s later to the `contact` page
    And An email is sent to the user confirming the success of the operation