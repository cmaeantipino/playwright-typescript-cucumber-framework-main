# Playwright + Cucumber BDD Framework

A test automation framework combining [Playwright](https://playwright.dev/) for browser automation with [Cucumber](https://cucumber.io/) for Behavior-Driven Development (BDD), written in TypeScript.

## Tech Stack

- **Playwright** — fast, reliable browser automation
- **Cucumber.js** — BDD test runner with Gherkin syntax
- **TypeScript** — type-safe step definitions and page objects
- **multiple-cucumber-html-reporter** — rich HTML test reports
- **GitHub Actions** — CI/CD pipeline

## Project Structure

```
├── src/
│   ├── features/          # Gherkin feature files
│   ├── steps/             # Step definitions (TypeScript)
│   ├── pages/             # Page Object Model classes
│   ├── hooks/             # Cucumber hooks (browser lifecycle, screenshots)
│   └── support/           # Utilities (report generator)
├── reports/               # Generated test reports & screenshots
├── .github/workflows/     # CI pipeline configuration
├── cucumber.json          # Cucumber configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (comes with Node.js)

## Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

## Running Tests

```bash
# Run all tests (headless)
npm test

# Run tests in headed mode (browser visible)
npm run test:headed

# Run tests filtered by tag
npm run test:tags -- "@smoke"
```

## Reports

After test execution, reports are generated automatically via the `posttest` script:

- **Cucumber HTML report** — `reports/cucumber-report.html`
- **Rich HTML report** — `reports/html/index.html`
- **JSON report** — `reports/cucumber-report.json`
- **Failure screenshots** — `reports/screenshots/`

To regenerate the HTML report manually:

```bash
npm run report
```

## Key Features

- **Page Object Model** — encapsulates page interactions in reusable classes (`src/pages/`)
- **Automatic screenshots on failure** — captured and attached to the report
- **BDD Gherkin syntax** — tests are written in plain English feature files
- **TypeScript throughout** — full type safety for step definitions, hooks, and page objects
- **CI/CD ready** — GitHub Actions workflow runs tests on push/PR to main

## Writing Tests

### 1. Create a feature file (`src/features/`)

```gherkin
Feature: My Feature

  Scenario: Example scenario
    Given I navigate to the Playwright website
    Then the page title should contain "Playwright"
```

### 2. Implement step definitions (`src/steps/`)

```typescript
import { Given, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';

Given('I navigate to the Playwright website', async function () {
  const page: Page = this.page;
  await page.goto('https://playwright.dev/');
});

Then('the page title should contain {string}', async function (title: string) {
  const page: Page = this.page;
  await expect(page).toHaveTitle(new RegExp(title));
});
```

### 3. (Optional) Create a page object (`src/pages/`)

```typescript
import { Page, expect } from '@playwright/test';

export class MyPage {
  constructor(private page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('https://example.com');
  }
}
```

## CI/CD

The GitHub Actions workflow (`.github/workflows/playwright.yml`) runs on pushes and pull requests to `main`/`master`. It:

1. Checks out the code
2. Sets up Node.js
3. Installs dependencies and Playwright browsers
4. Runs the test suite
5. Uploads the report as a build artifact (retained for 30 days)

## License

ISC
