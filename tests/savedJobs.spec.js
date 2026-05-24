const { test, expect } = require('./fixtures/fixture');
const { loginAs } = require('../Utils/loginHelper');

test.describe('Saved Jobs', () => {
  test.describe.configure({ mode: 'serial' });

  test('TC-18: Job saved and appears in saved jobs list', async ({ loginPage, jobSearchPage, savedJobsPage }) => {
    await loginAs(loginPage);
    await jobSearchPage.searchByKeyword('Business Analyst');
    await savedJobsPage.saveFirstJobFromResults();
    await savedJobsPage.navigateToSavedJobs();
    const count = await savedJobsPage.getSavedJobsCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC-19: Saved job disappears after removal', async ({ loginPage, savedJobsPage }) => {
    await loginAs(loginPage);
    await savedJobsPage.navigateToSavedJobs();
    const countBefore = await savedJobsPage.getSavedJobsCount();
    if (countBefore === 0) {
      console.warn('No saved jobs — run TC-18 first.');
      return;
    }
    await savedJobsPage.removeFirstSavedJob();
    const countAfter = await savedJobsPage.getSavedJobsCount();
    expect(countAfter).toBeLessThan(countBefore);
  });
});