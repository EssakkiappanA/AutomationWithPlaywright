import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyInfoPage extends BasePage {
  readonly pageTitle: Locator;
  readonly personalDetailsTab: Locator;
  readonly contactDetailsTab: Locator;
  readonly emergencyContactsTab: Locator;
  readonly dependentsTab: Locator;
  readonly immigrationTab: Locator;
  readonly jobTab: Locator;
  readonly salaryTab: Locator;
  readonly taxExemptionsTab: Locator;
  readonly reportToTab: Locator;
  readonly qualificationsTab: Locator;
  readonly membershipTab: Locator;
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly otherIdInput: Locator;
  readonly licenseNumberInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('h6:has-text("PIM")');
    this.personalDetailsTab = page.locator('a:has-text("Personal Details")');
    this.contactDetailsTab = page.locator('a:has-text("Contact Details")');
    this.emergencyContactsTab = page.locator('a:has-text("Emergency Contacts")');
    this.dependentsTab = page.locator('a:has-text("Dependents")');
    this.immigrationTab = page.locator('a:has-text("Immigration")');
    this.jobTab = page.locator('a:has-text("Job")');
    this.salaryTab = page.locator('a:has-text("Salary")');
    this.taxExemptionsTab = page.locator('a:has-text("Tax Exemptions")');
    this.reportToTab = page.locator('a:has-text("Report-to")');
    this.qualificationsTab = page.locator('a:has-text("Qualifications")');
    this.membershipTab = page.locator('a:has-text("Membership")');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator('input[name="employeeId"]').first();
    this.otherIdInput = page.locator('input[name="otherId"]');
    this.licenseNumberInput = page.locator('input[name="licenseNo"]');
    this.saveButton = page.locator('button[type="submit"]:has-text("Save")');
  }

  async navigateToMyInfo(): Promise<void> {
    await this.navigateToMenu('My Info');
    await this.pageTitle.waitFor();
  }

  async clickTab(tabName: string): Promise<void> {
    const tab = this.page.locator(`a:has-text("${tabName}")`);
    await tab.click();
    await this.waitForPageLoad();
  }

  async updatePersonalInfo(firstName: string, middleName: string, lastName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.middleNameInput.fill(middleName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
  }
}