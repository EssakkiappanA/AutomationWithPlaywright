import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
test.describe('Dashboard Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    
    await loginPage.navigate();
    await loginPage.loginWithValidCredentials();
  });

  test('TC_DASH_01: Verify dashboard page loads successfully', async () => {
    // Verify dashboard title is visible
    await expect(dashboardPage.dashboardTitle).toBeVisible();
    
    // Verify breadcrumb is present
    await expect(dashboardPage.breadcrumb).toBeVisible();
    
    // Verify URL contains dashboard
    expect(dashboardPage.page.url()).toContain('/dashboard');
  });

  test('TC_DASH_02: Verify dashboard widgets are displayed', async () => {
    // Verify Quick Launch widget
    await expect(dashboardPage.quickLaunchWidget).toBeVisible();
    
    // Verify Time at Work widget
    await expect(dashboardPage.timeAtWorkWidget).toBeVisible();
    
    // Verify My Actions widget
    await expect(dashboardPage.myActionsWidget).toBeVisible();
    
    // Take screenshot for verification
    await dashboardPage.takeScreenshot('dashboard-widgets');
  });

  test('TC_DASH_03: Verify Quick Launch functionality', async () => {
    // Verify Quick Launch widget is present
    await expect(dashboardPage.quickLaunchWidget).toBeVisible();
    
    // Verify quick action buttons are present
    await expect(dashboardPage.assignLeaveButton).toBeVisible();
    await expect(dashboardPage.leaveListButton).toBeVisible();
    await expect(dashboardPage.timesheetButton).toBeVisible();
    await expect(dashboardPage.applyLeaveButton).toBeVisible();
  });

  test('TC_DASH_04: Verify navigation from dashboard quick actions', async () => {
    // Click on Assign Leave
    await dashboardPage.assignLeaveButton.click();
    
    // Verify navigation to leave assignment page
    await dashboardPage.page.waitForURL('**/leave/assignLeave');
    expect(dashboardPage.page.url()).toContain('/leave/assignLeave');
    
    // Navigate back to dashboard
    await dashboardPage.navigateToMenu('Dashboard');
    await expect(dashboardPage.dashboardTitle).toBeVisible();
  });
});