class NotificationsPage {
  constructor(page) {
    this.page = page;

    this.locators = {
      jobAlertBell: '.bell-icon, button[title="Job Alert"]',
      alertKeywordInput: "input[placeholder='Skills, Designations, Companies']",
      alertEmailInput: "input[placeholder='Enter email']",
      createAlertButton: 'button.create-alert, button.saveAlert',
      alertSavedMsg: '.alert-success, .job-alert-success',
      alertListItem: '.alert-card, .job-alert-item',
      deleteAlertButton: '.delete-alert, button[title="Delete Alert"]',
      confirmDeleteBtn: 'button.confirm-delete, button.yes-btn',
      emptyAlertsMsg: '.no-alerts, .empty-list',
    };
  }

  async navigateToMyAlerts() {
    await this.page.goto('https://www.naukri.com/mnjuser/alerts', {
      waitUntil: 'domcontentloaded',
    });
  }

  async createJobAlert(keyword, email) {
    await this.page.click(this.locators.jobAlertBell);
    await this.page.fill(this.locators.alertKeywordInput, keyword);
    await this.page.fill(this.locators.alertEmailInput, email);
    await this.page.click(this.locators.createAlertButton);
    await this.page.waitForTimeout(1500);
  }

  async isAlertSavedMessageVisible() {
    return await this.page.locator(this.locators.alertSavedMsg).isVisible({ timeout: 6000 });
  }

  async getAlertCount() {
    return await this.page.locator(this.locators.alertListItem).count();
  }

  async deleteFirstAlert() {
    await this.page.locator(this.locators.deleteAlertButton).first().click();
    const confirmBtn = this.page.locator(this.locators.confirmDeleteBtn);
    if (await confirmBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await confirmBtn.click();
    }
    await this.page.waitForTimeout(1500);
  }

  async isEmptyAlertsMessageVisible() {
    return await this.page.locator(this.locators.emptyAlertsMsg).isVisible({ timeout: 6000 });
  }
}

module.exports = { NotificationsPage };