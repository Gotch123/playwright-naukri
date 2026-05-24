const { test, expect } = require('./fixtures/fixture');
const { loginAs } = require('../Utils/loginHelper');

test.describe('Edge Cases', () => {

  test('TC-20: Re-login prompt shown after session expires', async ({ loginPage, page }) => {
    await loginAs(loginPage);
    await page.context().clearCookies();   // simulate session expiry
    await page.goto('https://www.naukri.com/mnjuser/profile', {
      waitUntil: 'domcontentloaded',
    });
    const currentUrl = page.url();
    const loginVisible = await page.locator('a#login_Layer, .login-layer')
      .isVisible({ timeout: 6000 }).catch(() => false);
    expect(currentUrl.includes('login') || loginVisible).toBeTruthy();
  });

  test('TC-03b: Validation errors shown on empty login submit', async ({ loginPage, page }) => {
    await loginPage.goToDefaultHomePage();
    await loginPage.clickOnLogin();
    await loginPage.clickOnCredentialsSubmitButton();
    const errorVisible = await page.locator('.errLbl, .error, [class*="error"]')
      .isVisible({ timeout: 5000 }).catch(() => false);
    expect(errorVisible).toBeTruthy();
  });

  test('TC-04: Forgot password link visible and leads to email input', async ({ loginPage, page }) => {
    await loginPage.goToDefaultHomePage();
    await loginPage.clickOnLogin();
    const forgotLink = page.locator("a:has-text('Forgot'), a[href*='forgot']");
    await expect(forgotLink).toBeVisible({ timeout: 5000 });
    await forgotLink.click();
    await page.waitForLoadState('domcontentloaded');
    const emailInput = page.locator("input[type='email'], input[placeholder*='email']");
    await expect(emailInput).toBeVisible({ timeout: 5000 });
  });
});