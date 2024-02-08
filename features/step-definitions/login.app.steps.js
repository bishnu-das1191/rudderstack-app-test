const pactum = require('pactum');
const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals')
const { spec } = pactum;
const config = require('../../config.js');


Given(/^user on the login page$/, async function(){
	
    await browser.url('https://app.rudderstack.com/login');
});

When(/^user enters valid login credentials$/, async function(){

  // Wait for the email input field to be present for up to 10 seconds
  await browser.waitUntil(async () => {
    return await $('#text-input-email').isDisplayed();
  }, {
    timeout: 10000,
    timeoutMsg: 'Email input field is not displayed after 10 seconds'
  });

  await $('#text-input-email').setValue('rajaj80005@alibrs.com');
  await $('#text-input-password').setValue('Test@123456789');

	
});

When(/^user clicks the login button$/, async function(){
    await (await $('button.ant-btn.ant-btn-primary')).click();
});

Then(/^user should be redirected to the dashboard$/, async function(){
    await browser.pause(10000);
    await (await $("a[href='/addmfalater']")).click();
    await (await $('button.ant-btn.ant-btn-primary')).click();
    await browser.waitUntil(async () => {
        return await $('#sources-list').isDisplayed();
      }, {
        timeout: 15000,
        timeoutMsg: 'Added Source is not displayed after 10 seconds'
    });

    console.log(await browser.getUrl());
});


Then(/^user should see source and destination is in connected state$/, async function(){
	
    let mySourceName = 'My JavaScript Source';
    let myDestinationName = 'My Blueshift Destination';

    const sourceEnabledElement = await $("#sources-list svg[data-icon='check'] + div");
    const isSourceEnabled = await sourceEnabledElement.getText();

    const destinationEnabledElement = await $("#destinations-list svg[data-icon='check'] + div");
    const isDestinationEnabled = await destinationEnabledElement.getText();
    expect(isSourceEnabled).toEqual(isDestinationEnabled);

});



Given(/^user have valid login credentials$/, function(){
    browser.pause(10000);
    this.baseUrl = 'https://app.rudderstack.com/';
    // Set valid credentials
    this.credentials = {
        email: config.username,
        password: config.password
    };
});

When(/^user send a POST request to the login endpoint$/, async function(){
    this.response = await spec()
    .post('https://api.rudderstack.com/login')
    .withJson(this.credentials)	
});

Then(/^the response status code should be "([^"]*)"$/, function(statusCode){
  const expStatusCode = parseInt(statusCode, 10);
	expect(this.response.statusCode).toEqual(expStatusCode)
});

Then(/^the response body should contain a token$/, function(){
  expect(this.response.body.email).toEqual(config.username)
  expect(this.response.body.accessToken).toBePresent();
});


Given(/^user have invalid login credentials$/, function() {
  // Set invalid credentials
  this.credentials = {
    email: 'random.email@example.com',
    password: 'random@pwd'
  };
});


Then(/^the response body should contain an error message$/, function(){
  expect(this.response.body.message).toEqual('Incorrect username or password.');
});


Given(/^user have invalid login credentials with "([^"]*)" and "([^"]*)"$/, function(email, password){
	this.credentials = {
    email,
    password
  };
});



Then(/^the response body should contain an appropriate error message "([^"]*)"$/, function(expErrorMsg){
	expect(this.response.body.message).toEqual(expErrorMsg);
});












