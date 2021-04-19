@smoke @atm
Feature: I can confirm my account

  Scenario: I completed the initial registration step
    Then I receive a confirmation email with a link in it

  Scenario: I click the confirmation link
    Given The link has been sent less than 24 hours before
    Then I am redirected to the confirm page which will activate my account
    And I will be redirected to the `Contact` page

  Scenario: I click the confirmation link
    Given The link has been sent more than 24 hours before
    Then I am redirected to the confirm page which will activate my account
    And My account will not be confirmed
    And I am prompted an error message which states 'You need to register again'