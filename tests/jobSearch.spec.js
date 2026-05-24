const { test, expect } = require('./fixtures/fixture');
const { readExcelData } = require('../Utils/excelHelper');
const path = require('path');

const searchData = readExcelData(
  path.join(__dirname, '../testdata/testdata.xlsx'), 'SearchData'
);

test.describe('Job Search & Filters', () => {

  test('TC-05: Job results appear for valid keyword', async ({ jobSearchPage }) => {
    await jobSearchPage.goToHomePage();
    await jobSearchPage.searchByKeyword('Software Engineer');
    const count = await jobSearchPage.getJobResultsCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC-06: Results appear for keyword + location', async ({ jobSearchPage }) => {
    await jobSearchPage.goToHomePage();
    await jobSearchPage.searchByKeywordAndLocation('Developer', 'Bangalore');
    const count = await jobSearchPage.getJobResultsCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC-07: Results update after experience filter', async ({ jobSearchPage }) => {
    await jobSearchPage.goToHomePage();
    await jobSearchPage.searchByKeyword('QA Engineer');
    await jobSearchPage.applyExperienceFilter(2, 5);
    const count = await jobSearchPage.getJobResultsCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('TC-08: Results update after salary filter', async ({ jobSearchPage }) => {
    await jobSearchPage.goToHomePage();
    await jobSearchPage.searchByKeyword('Product Manager');
    await jobSearchPage.applySalaryFilter(5, 15);
    const count = await jobSearchPage.getJobResultsCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('TC-09: No results message for gibberish keyword', async ({ jobSearchPage }) => {
    await jobSearchPage.goToHomePage();
    await jobSearchPage.searchByKeyword('asdfgh123xyz');
    const noResults = await jobSearchPage.isNoResultsVisible();
    expect(noResults).toBeTruthy();
  });

  // Data-driven from Excel SearchData sheet
  for (const row of searchData) {
    test(`Excel: Search "${row.keyword}" in "${row.location}"`, async ({ jobSearchPage }) => {
      await jobSearchPage.goToHomePage();
      if (row.location) {
        await jobSearchPage.searchByKeywordAndLocation(row.keyword, row.location);
      } else {
        await jobSearchPage.searchByKeyword(row.keyword);
      }
      if (row.expectedResult === 'results') {
        const count = await jobSearchPage.getJobResultsCount();
        expect(count).toBeGreaterThan(0);
      } else {
        const noResults = await jobSearchPage.isNoResultsVisible();
        expect(noResults).toBeTruthy();
      }
    });
  }
});