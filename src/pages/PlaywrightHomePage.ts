import { Page, expect } from '@playwright/test';

export class PlaywrightHomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://playwright.dev/');
  }

  async verifyTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(new RegExp(expectedTitle));
  }

  async clickGetStartedLink(): Promise<void> {
    await this.page.getByRole('link', { name: 'Get started' }).click();
  }

  async verifyHeadingVisible(headingText: string): Promise<void> {
    await expect(
      this.page.getByRole('heading', { name: headingText })
    ).toBeVisible();
  }
}
