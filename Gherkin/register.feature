@smoke @atm
Feature: Register

  Scenario: I click on sign-up button
    Then I will be redirect to 'sign-up' page
    Given I had filled 'Username' field on sign-in page
    And my username have an arobase in the 'Username' field
    Then The 'Email' field will be filled with it on Register page

  Scenario: I click on sign-up button
    Then I will be redirect to 'sign-up' page
    Given I had filled 'Username' field on sign-in page
    And my username have no arobase in the 'Username' field
    Then The 'Username' field will be filled with it on Register page

  Scenario: I click on Register button
    Given I filled 'Username', 'Email', 'Password', 'Comfirmation password'
    Then I will be succesed with a message stating 'A mail has been sent to you, please click on the confirmation link to fianlise your registration'

  Scenario: I click on Register button
    Given I didn't filled every fields
    Then I will be errored (borders set to red) with a message stating 'this field is required'

  Scenario: I click on Register button
    Given I filled 'Username', 'Email', 'Password', 'Comfirmation password'
    And my email don't contain an arobase
    Then I will be errored (borders set to red) with a message stating 'Email wrongly formatted'

  Scenario: I click on Register button
    Given I filled 'Username', 'Email', 'Password', 'Comfirmation password'
    And my username is already used
    Then I will be warn (borders set to red on username field) with a message stating 'Do you want to recover your password ?' (The latest being a link to the`Recover` page, which if clicked will have the username pre-filed with the email that was set).'

  Scenario: I click on Register button
    Given I filled 'Username', 'Email', 'Password', 'Comfirmation password'
    And my email is already used
    Then I will be warn (borders set to red on username field) with a message stating 'It seems this accountalready exists. Do you want to recover your password?' (The latest being a link to the `Recover` page, which if clicked will have the username pre-filed with the email that was set). An email will also be sent to the email address with a message stating that someone tried to access the account, and if it was him, he can just click the provided recover link; if not, he better contact the support.