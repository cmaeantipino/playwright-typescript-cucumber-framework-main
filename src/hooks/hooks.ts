import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

// Set default timeout for steps (30 seconds)
setDefaultTimeout(30 * 1000);

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
});

AfterAll(async function () {
  await browser.close();
});

Before(async function () {
  context = await browser.newContext();
  page = await context.newPage();
  this.page = page;
  this.context = context;
});

After(async function (scenario) {
  // Attach screenshot on failure for the HTML report
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await page.screenshot({
      path: `reports/screenshots/${scenario.pickle.name.replace(/\s+/g, '_')}.png`,
      fullPage: true,
    });
    this.attach(screenshot, 'image/png');
  }

  await page.close();
  await context.close();
});
