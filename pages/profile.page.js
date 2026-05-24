const path = require('path');

class ProfilePage {
  constructor(page) {
    this.page = page;

    this.locators = {
      profileNavLink: 'a[href="/mnjuser/profile"]',
      updateResumeButton: "input[value='Update resume']",
      resumeUploadSuccess: '.upload-success, .resumeHeadline',
      resumeUploadError: '.upload-error, .errMsg',
      headlineEditIcon: 'div.widgetHead span.edit.icon',
      headlineInput: '#resumeHeadlineTxt',
      headlineSubmit: "button[type='submit']",
      headlineSavedText: '.resumeHeadline',
    };

    this.validResumePath = path.join(__dirname, '../testdata/Manisha_Resume.pdf');
    this.invalidResumePath = path.join(__dirname, '../testdata/invalid_resume.txt');
  }

  async navigateToProfile() {
    await this.page.click(this.locators.profileNavLink);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async uploadResume(filePath) {
    const resumePath = filePath || this.validResumePath;
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.page.click(this.locators.updateResumeButton),
    ]);
    await fileChooser.setFiles(resumePath);
    await this.page.waitForTimeout(2000);
  }

  async isUploadSuccessVisible() {
    return await this.page.locator(this.locators.resumeUploadSuccess).isVisible({ timeout: 8000 });
  }

  async getUploadErrorMessage() {
    return await this.page.locator(this.locators.resumeUploadError).textContent({ timeout: 6000 });
  }

  async updateHeadline(headlineText) {
    await this.page.locator(this.locators.headlineEditIcon).first().click();
    await this.page.locator(this.locators.headlineInput).press('End');
    await this.page.locator(this.locators.headlineInput).type(headlineText);
    await this.page.locator(this.locators.headlineSubmit).last().click();
    await this.page.waitForTimeout(1500);
  }

  async getSavedHeadlineText() {
    return await this.page.locator(this.locators.headlineSavedText).textContent();
  }
}

module.exports = { ProfilePage };