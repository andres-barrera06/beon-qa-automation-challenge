import { expect } from '@playwright/test';
import { CheckoutInfo } from '../models/user.model';
import { CheckoutSelectors } from '../selectors/checkout.selectors';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  async fillInformation(info: CheckoutInfo) {
    await this.page.locator(CheckoutSelectors.firstNameInput).fill(info.firstName);
    await this.page.locator(CheckoutSelectors.lastNameInput).fill(info.lastName);
    await this.page.locator(CheckoutSelectors.postalCodeInput).fill(info.zipCode);
    await this.page.locator(CheckoutSelectors.continueButton).click();
  }

  async finish() {
    await this.page.locator(CheckoutSelectors.finishButton).click();
  }

  async getTotalPrice(): Promise<string> {
    return this.page.locator(CheckoutSelectors.totalPriceLabel).innerText();
  }

  async expectOrderComplete() {
    await expect(this.page.locator(CheckoutSelectors.completeHeader))
      .toHaveText('Thank you for your order!');
  }
}
