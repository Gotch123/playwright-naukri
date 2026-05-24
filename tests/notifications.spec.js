const { test, expect } = require('./fixtures/fixture');
const { loginAs } = require('../Utils/loginHelper');
const { ENV } = require('../Utils/env');

test.describe('Notifications & Job Alerts', () => {
  test.describe.configure({ mode: 'serial' });

  test('TC-16: Job alert created with keyword and email', async ({ loginPage, notificationsPage }) => {
    await loginAs(loginPage);
    await notificationsPage.createJobAlert('QA Automation', ENV.USERNAME_1);
    const saved = await notificationsPage.isAlertSavedMessageVisible();
    expect(saved).toBeTruthy();
  });

  test('TC-17: Job alert disappears after deletion', async ({ loginPage, notificationsPage }) => {
    await loginAs(loginPage);
    await notificationsPage.navigateToMyAlerts();
    const countBefore = await notificationsPage.getAlertCount();
    if (countBefore === 0) {
      console.warn('No alerts to delete — run TC-16 first.');
      return;
    }
    await notificationsPage.deleteFirstAlert();
    const countAfter = await notificationsPage.getAlertCount();
    expect(countAfter).toBeLessThan(countBefore);
  });
});