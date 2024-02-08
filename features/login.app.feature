Feature: Login to RudderStack cloud application

  Scenario: Successfully login with valid credentials via UI
    Given user on the login page
    When user enters valid login credentials
    And user clicks the login button
    Then user should be redirected to the dashboard
    And user should see source and destination is in connected state

  Scenario: Successfully login with valid credentials via api
    Given user have valid login credentials
    When user send a POST request to the login endpoint
    Then the response status code should be "200"
    And the response body should contain a token

  Scenario: Fail to login with invalid credentials via api
    Given user have invalid login credentials
    When user send a POST request to the login endpoint
    Then the response status code should be "400"
    And the response body should contain an error message

  Scenario Outline: Fail to login with multiple invalid credentials via api
    Given user have invalid login credentials with "<email>" and "<password>"
    When user send a POST request to the login endpoint
    Then the response status code should be "400"
    And the response body should contain an appropriate error message "<errorMessage>"

    Examples: 
      | email                     | password       | errorMessage                    |
      | invalid@                  | Test@123456789 | Incorrect username or password. |
      | rajaj80005@alibrs.com     | password       | Incorrect username or password. |
      | !@#$%^&*()_+              | Test@123456789 | Incorrect username or password. |
      | rajaj80005@alibrs.com     | test@123456789 | Incorrect username or password. |
      | ' rajaj80005@alibrs.com ' | Test@123456789 | Incorrect username or password. |
      | []                        | []             | Incorrect username or password. |
      |                           | Test@123456789 | Email is missing                |
      | rajaj80005@alibrs.com     |                | Password is missing             |
      |                           |                | Email is missing                |
      | null                      | null           | Incorrect username or password. |
