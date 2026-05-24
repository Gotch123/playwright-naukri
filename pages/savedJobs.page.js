class SavedJobsPage {
  constructor(page) {
    this.page = page;

    this.locators = {
      saveJobButton: "button[title='Save job'], .save-job",
      savedJobsNavLink: 'a[href*="saved-jobs"], a[href*="savedJobs"]',
      savedJobCard: '.saved-job-item, .jobTupleHeader',
      removeSavedButton: 'button[title="Remove"], .remove-saved',
      emptyMsg: '.no-saved-jobs, .empty-list',
      saveConfirmToast: '.toast-success, .job-saved-toast',
    };
  }

  async navigateToSavedJobs() {
    await this.page.goto('https://www.naukri.com/mnjuser/savedjobs', {
      waitUntil: 'domcontentloaded',
    });
  }

  async saveFirstJobFromResults() {
    await this.page.locator(this.locators.saveJobButton).first().click();
    await this.page.waitForTimeout(1500);
  }

  async isSaveConfirmationVisible() {
    return await this.page.locator(this.locators.saveConfirmToast).isVisible({ timeout: 6000 });
  }

  async getSavedJobsCount() {
    return await this.page.locator(this.locators.savedJobCard).count();
  }

  async removeFirstSavedJob() {
    await this.page.locator(this.locators.removeSavedButton).first().click();
    await this.page.waitForTimeout(1500);
  }

  async isEmptyMessageVisible() {
    return await this.page.locator(this.locators.emptyMsg).isVisible({ timeout: 6000 });
  }
}

module.exports = { SavedJobsPage };