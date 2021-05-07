Feature: Register

  Scenario: Success
    When I register
    Then a success alert is displayed
    And the url is /signup

  Scenario: Empty field
    When I register with an empty field
    Then the empty field should be errored with red border
    And the url is /signup
    And a warning alert is displayed

  Scenario: Wrongly formatted email
    When I register with a mail which don't has arobase
    Then the empty field should be errored with red border
    And the url is /signup
    And an error alert is displayed

  Scenario: Already used email
    When I register with a mail already used
    Then the email field should be errored with red border
    And the url is /signup
    And an error alert is displayed