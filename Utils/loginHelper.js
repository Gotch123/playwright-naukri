const { ENV } = require('./env');

/**
 * Reusable login — call this in any test that needs a logged-in session.
 * @param {LoginPage} loginPage
 * @param {string}    username  - defaults to ENV.USERNAME_1
 * @param {string}    password  - defaults to ENV.PASSWORD
 */
async function loginAs(loginPage, username = ENV.USERNAME_1, password = ENV.PASSWORD) {
  await loginPage.goToDefaultHomePage();
  await loginPage.clickOnLogin();
  await loginPage.enterUsername(username);
  await loginPage.enterPassword(password);
  await loginPage.clickOnCredentialsSubmitButton();
  await loginPage.page.waitForLoadState('domcontentloaded');
  await loginPage.page.waitForTimeout(2000);
}

module.exports = { loginAs };