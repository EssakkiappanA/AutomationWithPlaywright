import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly dashboardTitle: Locator;
  readonly quickLaunchWidget: Locator;
  readonly timeAtWorkWidget: Locator;
  readonly myActionsWidget: Locator;
  readonly employeeDistributionWidget: Locator;
  readonly breadcrumb: Locator;
  readonly assignLeaveButton: Locator;
  readonly leaveListButton: Locator;
  readonly timesheetButton: Locator;
  readonly applyLeaveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardTitle = page.locator('h6:has-text("Dashboard")');
    this.quickLaunchWidget = page.locator('.orangehrm-dashboard-widget:has-text("Quick Launch")');
    this.timeAtWorkWidget = page.locator('.orangehrm-dashboard-widget:has-text("Time at Work")');
    this.myActionsWidget = page.locator('.orangehrm-dashboard-widget:has-text("My Actions")');
    this.employeeDistributionWidget = page.locator('.orangehrm-dashboard-widget:has-text("Employee Distribution")');
    this.breadcrumb = page.locator('.oxd-topbar-header-breadcrumb');
    this.assignLeaveButton = page.locator('button:has-text("Assign Leave")');
    this.leaveListButton = page.locator('button:has-text("Leave List")');
    this.timesheetButton = page.locator('button:has-text("Timesheet")');
    this.applyLeaveButton = page.locator('button:has-text("Apply Leave")');
  }

  async verifyDashboardLoaded(): Promise<void> {
    await this.dashboardTitle.waitFor();
    await this.breadcrumb.waitFor();
  }

  async clickQuickLaunchAction(action: string): Promise<void> {
    const actionButton = this.page.locator(`button:has-text("${action}")`);
    await actionButton.click();
  }
}