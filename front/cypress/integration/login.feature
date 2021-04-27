Feature: Login

  Scenario: Success
    When I login
    Then a success alert is displayed
    And the url is /contact
    And I'm logged

  Scenario: Wrong credentials
    When I login with wrong credentials
    Then the url is /
    And an error alert is displayed

  Scenario: Empty credentials
    When I login with an empty field
    Then the empty field should be errored with red border
    And the url is /
    And a warning alert is displayed