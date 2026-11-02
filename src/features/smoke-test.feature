Feature: Playwright Get Started Website

@smoke
  Scenario: Smoke Test
    Given I navigate to the Playwright Get Started page
    When I click the "VS Code Extension" link
    Then the page title should contain "Playwright"
    Then I should see the "VS Code" heading
    Then I should see the "Introduction" heading
    Then I should see the "Prerequisites" heading
    Then I should see the "Getting Started" heading
    Then I should be able to play the "Watch Getting Started with"