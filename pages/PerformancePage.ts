import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class PerformancePage extends BasePage {
  readonly pageTitle: Locator;
  readonly configureTab: Locator;
  readonly manageReviewsTab: Locator;
  readonly myReviewsTab: Locator;
  readonly employeeReviewsTab: Locator;
  readonly addButton: Locator;
  readonly searchButton: Locator;
  readonly resetButton: Locator;
  readonly employeeNameInput: Locator;
  readonly jobTitleDropdown: Locator;
  readonly subunitDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('h6:has-text("Performance")');
    this.configureTab = page.locator('a:has-text("Configure")');
    this.manageReviewsTab = page.locator('a:has-text("Manage Reviews")');
    this.myReviewsTab = page.locator('a:has-text("My Reviews")');
    this.employeeReviewsTab = page.locator('a:has-text("Employee Reviews")');
    this.addButton = page.locator('button:has-text("Add")');
    this.searchButton = page.locator('button[type="submit"]:has-text("Search")');
    this.resetButton = page.locator('button[type="button"]:has-text("Reset")');
    this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]');
    this.jobTitleDropdown = page.locator('.oxd-select-text:has-text("-- Select --")').first();
    this.subunitDropdown = page.locator('.oxd-select-text:has-text("-- Select --")').last();
  }

  async navigateToPerformance(): Promise<void> {
    await this.navigateToMenu('Performance');
    await this.pageTitle.waitFor();
  }

  async clickTab(tabName: string): Promise<void> {
    const tab = this.page.locator(`a:has-text("${tabName}")`);
    await tab.click();
    await this.waitForPageLoad();
  }

  async searchEmployee(employeeName: string): Promise<void> {
    await this.employeeNameInput.fill(employeeName);
    await this.page.waitForTimeout(2000); // Wait for autocomplete
    await this.searchButton.click();
  }
}