import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MyInfoPage } from '../pages/MyInfoPage';

test.describe('My Info Tests', () => {
  let loginPage: LoginPage;
  let myInfoPage: MyInfoPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    myInfoPage = new MyInfoPage(page);
    
    await loginPage.navigate();
    await loginPage.loginWithValidCredentials();
    await myInfoPage.navigateToMyInfo();
  });

  test('TC_INFO_01: Verify My Info page loads successfully', async () => {
    // Verify page title
    await expect(myInfoPage.pageTitle).toBeVisible();
    
    // Verify Personal Details tab is active by default
    await expect(myInfoPage.personalDetailsTab).toBeVisible();
    
    // Verify personal information form is displayed
    await expect(myInfoPage.firstNameInput).toBeVisible();
    await expect(myInfoPage.lastNameInput).toBeVisible();
    
    // Verify URL contains viewPersonalDetails
    expect(myInfoPage.page.url()).toContain('/viewPersonalDetails');
  });

  test('TC_INFO_02: Verify personal details form elements', async () => {
    // Verify all main personal detail fields are present
    await expect(myInfoPage.firstNameInput).toBeVisible();
    await expect(myInfoPage.middleNameInput).toBeVisible();
    await expect(myInfoPage.lastNameInput).toBeVisible();
    await expect(myInfoPage.employeeIdInput).toBeVisible();
    await expect(myInfoPage.otherIdInput).toBeVisible();
    await expect(myInfoPage.licenseNumberInput).toBeVisible();
    await expect(myInfoPage.saveButton).toBeVisible();
  });

  test('TC_INFO_03: Verify My Info tabs navigation', async () => {
    // Test Contact Details tab
    await myInfoPage.clickTab('Contact Details');
    expect(myInfoPage.page.url()).toContain('/contactDetails');
    
    // Test Emergency Contacts tab
    await myInfoPage.clickTab('Emergency Contacts');
    expect(myInfoPage.page.url()).toContain('/emergencyContacts');
    
    // Test Dependents tab
    await myInfoPage.clickTab('Dependents');
    expect(myInfoPage.page.url()).toContain('/dependents');
    
    // Navigate back to Personal Details
    await myInfoPage.clickTab('Personal Details');
    expect(myInfoPage.page.url()).toContain('/viewPersonalDetails');
  });

  test('TC_INFO_04: Verify personal information update functionality', async () => {
    // Get current values
    const currentFirstName = await myInfoPage.firstNameInput.inputValue();
    const currentLastName = await myInfoPage.lastNameInput.inputValue();
    
    // Update personal information (adding test suffix)
    const newFirstName = currentFirstName + '_Test';
    const newMiddleName = 'TestMiddle';
    const newLastName = currentLastName + '_Test';
    
    await myInfoPage.updatePersonalInfo(newFirstName, newMiddleName, newLastName);
    
    // Wait for save completion
    await myInfoPage.page.waitForTimeout(2000);
    
    // Verify values were updated
    await expect(myInfoPage.firstNameInput).toHaveValue(newFirstName);
    await expect(myInfoPage.middleNameInput).toHaveValue(newMiddleName);
    await expect(myInfoPage.lastNameInput).toHaveValue(newLastName);
    
    // Restore original values
    await myInfoPage.updatePersonalInfo(currentFirstName, '', currentLastName);
  });
});