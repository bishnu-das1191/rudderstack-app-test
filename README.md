# RudderStack Project

This project contains automated tests for the RudderStack application, covering both API and UI functionalities.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bishnu-das1191/rudderstack-app-test.git


## Navigate to the project directory:
    ```bash
    cd rudderstack-app-test
    ```

## Install dependencies:
    ```bash
    npm install
    ```

## Configuration 
1. Configure environment variables by creating a .env file in the root directory. Add the following variables:
    ```bash
    QA_USERNAME=your_username
    QA_PASSWORD=your_password
    ```

2. Update the wdio.api.conf.js and wdio.ui.conf.js files with the appropriate configurations.

## Running Tests using feature file path
    ```bash
        NODE_ENV=qa npx wdio wdio.conf.js
    ```
 Note : 'qa' can be used as input enviornment.

## Dependencies
    @wdio/cli
    pactum
    @babel/register
    @types/cucumber
    @wdio/cucumber-framework
    @wdio/local-runner
    @wdio/mocha-framework
    @wdio/spec-reporter
    cucumber
    dotenv

Thank You :-)