const { test: base } = require('@playwright/test');
const { LoginPage } = require('../../pages/login.page');
const { JobSearchPage } = require('../../pages/jobSearch.page');
const { JobDetailsPage } = require('../../pages/jobDetails.page');
const { ProfilePage } = require('../../pages/profile.page');
const { NotificationsPage } = require('../../pages/notifications.page');
const { SavedJobsPage } = require('../../pages/savedJobs.page');

const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  jobSearchPage: async ({ page }, use) => {
    await use(new JobSearchPage(page));
  },
  jobDetailsPage: async ({ page }, use) => {
    await use(new JobDetailsPage(page));
  },
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
  notificationsPage: async ({ page }, use) => {
    await use(new NotificationsPage(page));
  },
  savedJobsPage: async ({ page }, use) => {
    await use(new SavedJobsPage(page));
  },
});

const { expect } = require('@playwright/test');
module.exports = { test, expect };