import { Given, When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { GetStartedPage } from '../pages/GetStartedPage';

Given('I navigate to the Playwright website', async function () {
  const page: Page = this.page;
  await page.goto('https://playwright.dev/');
});

When('I click the {string} link', async function (linkName: string) {
  const page: Page = this.page;
  await page.getByRole('link', { name: linkName, exact: true }).click();
});

Then('the page title should contain {string}', async function (expectedTitle: string) {
  const page: Page = this.page;
  await expect(page).toHaveTitle(new RegExp(expectedTitle));
});

Then('I should see the {string} heading', async function (headingText: string) {
  const page: Page = this.page;
  await expect(page.getByRole('heading', { name: headingText })).toBeVisible();
});


Given('I navigate to the Playwright Get Started page', async function () {
  const page: Page = this.page;
  await new GetStartedPage(page).navigateGetStartedPage();
});

Then('I should be able to play the {string}', async function (playVideo: string) {
  const page: Page = this.page;
  await page.getByRole('button', { name: playVideo }).click();
});