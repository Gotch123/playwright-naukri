class JobDetailsPage {
  constructor(page) {
    this.page = page;

    this.locators = {
      jobCards: '.srp-jobtuple-wrapper',
      jobDescription: '.job-desc, .dang-inner-html',
      applyButton: 'button.apply-button, a.apply-button',
      confirmationMsg: '.already-applied, .apply-success, .chatbot_DrawerAnim',
      loginModalTitle: 'div.login-layer, div.loginModal',
    };
  }

  async clickFirstJobCard() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.page.locator(this.locators.jobCards).first().click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }

  async isJobDescriptionVisible(detailPage) {
    return await detailPage.locator(this.locators.jobDescription).isVisible({ timeout: 6000 });
  }

  async clickApply(detailPage) {
    await detailPage.locator(this.locators.applyButton).first().click();
    await detailPage.waitForLoadState('domcontentloaded');
  }

  async isApplicationConfirmed(detailPage) {
    return await detailPage.locator(this.locators.confirmationMsg).isVisible({ timeout: 8000 });
  }

  async isLoginPromptVisible(detailPage) {
    return await detailPage.locator(this.locators.loginModalTitle).isVisible({ timeout: 6000 });
  }
}

module.exports = { JobDetailsPage };