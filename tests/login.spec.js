// Single import from fixture only — no duplicate 'test' import
import { test, expect } from './fixtures/fixture';
// const { test, expect } = require('./fixtures/fixture');
const { ENV } = require('../Utils/env');
const { readExcelData } = require('../Utils/excelHelper');
const path = require('path');

const loginData = readExcelData(
  path.join(__dirname, '../testdata/testdata.xlsx'), 'LoginData'
);

// ─── TC-01 to TC-03: Login Tests ─────────────────────────────────────────────

test.describe('Login Tests', () => {
  test.describe.configure({ mode: 'serial' });

  test('TC-01: Successful login with valid credentials', async ({ loginPage, page }) => {
    await loginPage.goToDefaultHomePage();
    await loginPage.clickOnLogin();
    await loginPage.enterUsername(ENV.USERNAME_1);
    await loginPage.enterPassword(ENV.PASSWORD);
    await loginPage.clickOnCredentialsSubmitButton();
    await page.waitForURL(/naukri\.com/, { timeout: 10000 });
    await expect(page.locator('div.view-profile-wrapper')).toBeVisible();
  });

  test('TC-02: Error message shown on invalid password', async ({ loginPage }) => {
    await loginPage.goToDefaultHomePage();
    await loginPage.clickOnLogin();
    await loginPage.enterUsername(ENV.USERNAME_1);
    await loginPage.enterPassword(ENV.N_PASSWORD);
    await loginPage.clickOnCredentialsSubmitButton();
    const error = await loginPage.getErrorMessage();
    expect(error).toBeTruthy();
  });

  test('TC-03: Data-driven login from Excel', async ({ loginPage, page }) => {
    const row = loginData[0];
    await loginPage.goToDefaultHomePage();
    await loginPage.clickOnLogin();
    await loginPage.enterUsername(row.username);
    await loginPage.enterPassword(row.password);
    await loginPage.clickOnCredentialsSubmitButton();

    if (row.expectedResult === 'success') {
      await expect(page.locator('a[href="/mnjuser/profile"]')).toBeVisible();
    } else {
      const error = await loginPage.getErrorMessage();
      expect(error).toBeTruthy();
    }
  });
});

// ─── TC-13/14: Profile & Resume (original tests kept here) ───────────────────

test.describe('Profile Update Tests', () => {
  test.describe.configure({ mode: 'serial' });

  test('TC-13/14: Update profile and upload resume — Account 1', async ({ loginPage, page }) => {
    await loginPage.goToDefaultHomePage();
    await loginPage.clickOnLogin();
    await loginPage.enterUsername(ENV.USERNAME_1);
    await loginPage.enterPassword(ENV.PASSWORD);
    await loginPage.clickOnCredentialsSubmitButton();
    await page.reload();
    await loginPage.clickOnProfileButton();
    await loginPage.uploadResume();
    await loginPage.updateHeadline(ENV.HEADLINE_TEXT);
  });

  // test('TC-13/14: Update profile and upload resume — Account 2', async ({ loginPage, page }) => {
  //   await loginPage.goToDefaultHomePage();
  //   await loginPage.clickOnLogin();
  //   await loginPage.enterUsername(ENV.USERNAME_2);
  //   await loginPage.enterPassword(ENV.PASSWORD);
  //   await loginPage.clickOnCredentialsSubmitButton();
  //   await page.reload();
  //   await loginPage.clickOnProfileButton();
  //   await loginPage.uploadResume(loginPage.anotherResumeLocation);
  //   await loginPage.updateHeadline(ENV.HEADLINE_TEXT);
  // });
});