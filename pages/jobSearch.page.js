class JobSearchPage {
  constructor(page) {
    this.page = page;

    this.locators = {
      searchKeywordInput: "input[placeholder='Skills, Designations, Companies']",
      searchLocationInput: "input[placeholder='Location']",
      searchButton: 'button.search-btn',
      experienceDropdown: 'span.expYears',
      experienceMin: 'select[name="minExp"]',
      experienceMax: 'select[name="maxExp"]',
      salaryFilter: 'span.salary',
      salaryMin: 'select[name="minSal"]',
      salaryMax: 'select[name="maxSal"]',
      applyFilterButton: 'button.apply-btn',
      jobCards: '.srp-jobtuple-wrapper',
      noResultsMsg: '.noResultsMsg, h1.noResult',
    };
  }

  async goToHomePage() {
    await this.page.goto('https://www.naukri.com/', { waitUntil: 'domcontentloaded' });
  }

  async searchByKeyword(keyword) {
    await this.page.fill(this.locators.searchKeywordInput, keyword);
    await this.page.click(this.locators.searchButton);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async searchByKeywordAndLocation(keyword, location) {
    await this.page.fill(this.locators.searchKeywordInput, keyword);
    await this.page.fill(this.locators.searchLocationInput, location);
    await this.page.click(this.locators.searchButton);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async applyExperienceFilter(minYears, maxYears) {
    await this.page.click(this.locators.experienceDropdown);
    await this.page.selectOption(this.locators.experienceMin, String(minYears));
    await this.page.selectOption(this.locators.experienceMax, String(maxYears));
    await this.page.click(this.locators.applyFilterButton);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async applySalaryFilter(minLakh, maxLakh) {
    await this.page.click(this.locators.salaryFilter);
    await this.page.selectOption(this.locators.salaryMin, String(minLakh));
    await this.page.selectOption(this.locators.salaryMax, String(maxLakh));
    await this.page.click(this.locators.applyFilterButton);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getJobResultsCount() {
    return await this.page.locator(this.locators.jobCards).count();
  }

  async isNoResultsVisible() {
    return await this.page.locator(this.locators.noResultsMsg).isVisible({ timeout: 6000 });
  }

  async clickFirstJobCard() {
    await this.page.locator(this.locators.jobCards).first().click();
  }
}

module.exports = { JobSearchPage };