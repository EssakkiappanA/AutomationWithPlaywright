import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PerformancePage } from '../pages/PerformancePage';

test.describe('Performance Tests', () => {
  let loginPage: LoginPage;
  let performancePage: PerformancePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    performancePage = new PerformancePage(page);
    
    await loginPage.navigate();
    await loginPage.loginWithValidCredentials();
    await performancePage.navigateToPerformance();
  });

  test('TC_PERF_01: Verify performance page loads successfully', async () => {
    // Verify performance page title
    await expect(performancePage.pageTitle).toBeVisible();
    
    // Verify main tabs are present
    await expect(performancePage.configureTab).toBeVisible();
    await expect(performancePage.manageReviewsTab).toBeVisible();
    await expect(performancePage.myReviewsTab).toBeVisible();
    
    // Verify URL contains performance
    expect(performancePage.page.url()).toContain('/performance');
  });

  test('TC_PERF_02: Verify performance tabs navigation', async () => {
    // Click on Configure tab
    await performancePage.clickTab('Configure');
    await expect(performancePage.page.locator('h6:has-text("KPIs")')).toBeVisible();
    
    // Click on Manage Reviews tab
    await performancePage.clickTab('Manage Reviews');
    await expect(performancePage.page.locator('h6:has-text("Manage Reviews")')).toBeVisible();
    
    // Click on My Reviews tab  
    await performancePage.clickTab('My Reviews');
    await expect(performancePage.page.locator('h6:has-text("My Reviews")')).toBeVisible();
  });

  test('TC_PERF_03: Verify employee reviews search functionality', async () => {
    // Navigate to Employee Reviews
    await performancePage.clickTab('Employee Reviews');
    
    // Verify search elements are present
    await expect(performancePage.searchButton).toBeVisible();
    await expect(performancePage.resetButton).toBeVisible();
    
    // Perform search (without entering data to test empty search)
    await performancePage.searchButton.click();
    
    // Verify page doesn't crash and maintains structure
    await expect(performancePage.pageTitle).toBeVisible();
  });

  test('TC_PERF_04: Verify performance review creation access', async () => {
    // Navigate to Manage Reviews
    await performancePage.clickTab('Manage Reviews');
    
    // Verify Add button is present
    await expect(performancePage.addButton).toBeVisible();
    
    // Click Add button
    await performancePage.addButton.click();
    
    // Verify navigation to review creation form
    expect(performancePage.page.url()).toContain('/performance/saveReview');
    
    // Verify form elements are present
    await expect(performancePage.page.locator('h6:has-text("Add Review")')).toBeVisible();
  });
});