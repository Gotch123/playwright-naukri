const { test, expect } = require('./fixtures/fixture');
const { loginAs } = require('../Utils/loginHelper');

test.describe('Job Details & Application', () => {

  test('TC-10: Job description loads when clicking a job card', async ({ jobSearchPage, jobDetailsPage }) => {
    await jobSearchPage.goToHomePage();
    await jobSearchPage.searchByKeyword('Software Engineer');
    const detailPage = await jobDetailsPage.clickFirstJobCard();
    await expect(detailPage.locator('h1').first()).toBeVisible({ timeout: 8000 });
    const descVisible = await jobDetailsPage.isJobDescriptionVisible(detailPage);
    expect(descVisible).toBeTruthy();
    await detailPage.close();
  });

  test('TC-11: Apply to job while logged in', async ({ loginPage, jobSearchPage, jobDetailsPage }) => {
    await loginAs(loginPage);
    await jobSearchPage.searchByKeyword('QA Automation Engineer');
    const detailPage = await jobDetailsPage.clickFirstJobCard();
    await jobDetailsPage.clickApply(detailPage);
    const confirmed = await jobDetailsPage.isApplicationConfirmed(detailPage);
    expect(confirmed).toBeTruthy();
    await detailPage.close();
  });

  test('TC-12: Login prompt shown when applying without login', async ({ jobSearchPage, jobDetailsPage }) => {
    await jobSearchPage.goToHomePage();
    await jobSearchPage.searchByKeyword('Data Analyst');
    const detailPage = await jobDetailsPage.clickFirstJobCard();
    await jobDetailsPage.clickApply(detailPage);
    const loginPrompt = await jobDetailsPage.isLoginPromptVisible(detailPage);
    expect(loginPrompt).toBeTruthy();
    await detailPage.close();
  });
});