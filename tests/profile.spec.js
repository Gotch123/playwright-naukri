const { test, expect } = require('./fixtures/fixture');
const { loginAs } = require('../Utils/loginHelper');
const { readExcelData } = require('../Utils/excelHelper');
const { ENV } = require('../Utils/env');
const path = require('path');

const profileData = readExcelData(
  path.join(__dirname, '../testdata/testdata.xlsx'), 'ProfileData'
);

test.describe('Profile Management', () => {
  test.describe.configure({ mode: 'serial' });

  test('TC-13: Profile headline updates and persists', async ({ loginPage, profilePage }) => {
    await loginAs(loginPage);
    await profilePage.navigateToProfile();
    await profilePage.updateHeadline(ENV.HEADLINE_TEXT);
    await loginPage.page.reload();
    const savedText = await profilePage.getSavedHeadlineText();
    expect(savedText).toContain(ENV.HEADLINE_TEXT.slice(0, 15));
  });

  test('TC-14: Successful resume upload with valid PDF', async ({ loginPage, profilePage }) => {
    await loginAs(loginPage);
    await profilePage.navigateToProfile();
    await profilePage.uploadResume();
    const success = await profilePage.isUploadSuccessVisible();
    expect(success).toBeTruthy();
  });

  test('TC-15: Error shown for unsupported file format (.txt)', async ({ loginPage, profilePage }) => {
    await loginAs(loginPage);
    await profilePage.navigateToProfile();
    await profilePage.uploadResume(profilePage.invalidResumePath);
    const errorMsg = await profilePage.getUploadErrorMessage();
    expect(errorMsg).toBeTruthy();
  });

  // Data-driven: one test per row in ProfileData sheet
  for (const row of profileData) {
    test(`Excel: Update profile for ${row.username}`, async ({ loginPage, profilePage }) => {
      await loginAs(loginPage, row.username, row.password);
      await profilePage.navigateToProfile();
      if (row.resumeFile) {
        const resumePath = path.join(__dirname, `../testdata/${row.resumeFile}`);
        await profilePage.uploadResume(resumePath);
        expect(await profilePage.isUploadSuccessVisible()).toBeTruthy();
      }
      if (row.headline) {
        await profilePage.updateHeadline(row.headline);
      }
    });
  }
});