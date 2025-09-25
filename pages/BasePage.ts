import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  async navigateToMenu(menuName: string): Promise<void> {
    const menuItem = this.page.locator(`//span[text()='${menuName}']`);
    await menuItem.click();
    await this.waitForPageLoad();
  }
}