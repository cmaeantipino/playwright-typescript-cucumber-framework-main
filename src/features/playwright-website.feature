Feature: Playwright Website

  Scenario: Verify the page title
    Given I navigate to the Playwright website
    Then the page title should contain "Playwright"

  Scenario: Navigate to Get Started page
    Given I navigate to the Playwright website
    When I click the "Get started" link
    Then I should see the "Installation" heading
