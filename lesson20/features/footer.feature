Feature: Footer links on Wishpicks
  As a visitor of Wishpicks
  I want to see correct footer navigation
  So that I can use important links

  Background:
    Given I open the Wishpicks homepage

  Scenario: All footer links have href
    Then every footer link should have non-empty href

  Scenario: Navigate to Privacy Policy from footer
    When I click footer link "Політика конфіденційності"
    Then the path should be "/privacy-policy"

  Scenario: Clicking the logo in the footer stays on locale homepage
    When I click the visible footer logo
    Then the path should be "/"
