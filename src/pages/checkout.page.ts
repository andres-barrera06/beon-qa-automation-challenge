import { expect } from '@playwright/test';
import { CheckoutInfo } from '../models/user.model';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  private readonly firstNameInput = this.page.getByPlaceholder('First Name');
  private readonly lastNameInput = this.page.getByPlaceholder('Last Name');
  private readonly zipCodeInput = this.page.getByPlaceholder('Zip/Postal Code');
  private readonly continueButton = this.page.getByRole('button', { name: 'Continue' });
  private readonly finishButton = this.page.getByRole('button', { name: 'Finish' });
  private readonly successMessage = this.page.getByText('Thank you for your order!');
  private readonly summaryTotal = this.page.locator('.summary_total_label');

  async fillInformation(info: CheckoutInfo) {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.zipCodeInput.fill(info.zipCode);
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async getTotalPrice(): Promise<string> {
    return this.summaryTotal.innerText();
  }

  async expectOrderComplete() {
    await expect(this.successMessage).toBeVisible();
  }
}
