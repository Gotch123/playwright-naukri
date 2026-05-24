const { ENV } = require('../Utils/env');
const path = require('path');

class LoginPage {
  constructor(page) {
    this.page = page;

    this.locators = {
      loginButton: 'a#login_Layer',
      usernameInput: "input[placeholder='Enter your active Email ID / Username']",
      passwordInput: "input[placeholder='Enter your password']",
      credentialsSubmitButton: 'button.btn-primary.loginButton',
      profileButton: 'a[href="/mnjuser/profile"]',
      updateResumeButton: "input[value='Update resume']",
      headlineEditIcon: 'div.widgetHead span.edit.icon',
      headlineInput: '#resumeHeadlineTxt',
      headlineSubmit: "button[type='submit']",
      errorMessage: 'div.errLbl',
    };

    // Resume file paths — __dirname works normally in CommonJS
    this.resumeLocation = path.join(__dirname, '../testdata/Manisha_Resume.pdf');
    this.anotherResumeLocation = path.join(__dirname, '../testdata/Manisha_Kumari_Resume.pdf');
  }

  async goToDefaultHomePage() {
    await this.page.goto(ENV.BASE_URL, { waitUntil: 'domcontentloaded' });
  }

  async clickOnLogin() {
    await this.page.click(this.locators.loginButton);
  }

  async enterUsername(username) {
    await this.page.fill(this.locators.usernameInput, username);
  }

  async enterPassword(password) {
    await this.page.fill(this.locators.passwordInput, password);
  }

  async clickOnCredentialsSubmitButton() {
    await this.page.click(this.locators.credentialsSubmitButton);
  }

  async clickOnProfileButton() {
    await this.page.click(this.locators.profileButton);
  }

  async uploadResume(resumePath) {
    const filePath = resumePath || this.resumeLocation;
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.page.click(this.locators.updateResumeButton),
    ]);
    await fileChooser.setFiles(filePath);
  }

  async updateHeadline(headlineText = ENV.HEADLINE_TEXT) {
    await this.page.locator(this.locators.headlineEditIcon).first().click();
    await this.page.locator(this.locators.headlineInput).press('End');
    await this.page.locator(this.locators.headlineInput).type(headlineText);
    await this.page.locator(this.locators.headlineSubmit).last().click();
  }

  async getErrorMessage() {
    return await this.page.locator(this.locators.errorMessage).textContent();
  }
}

module.exports = { LoginPage };