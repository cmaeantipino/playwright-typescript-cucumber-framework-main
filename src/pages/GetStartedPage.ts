import { Page, expect } from '@playwright/test';

export class GetStartedPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateGetStartedPage(): Promise<void> {
    await this.page.goto('https://playwright.dev/docs/intro');
  }
}