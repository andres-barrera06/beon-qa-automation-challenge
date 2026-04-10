import { test } from '@playwright/test';
import { CheckoutPage } from '../pages/checkout.page';
import { CheckoutInfo } from '../models/user.model';

export class CheckoutSteps {
  constructor(private checkoutPage: CheckoutPage) {}

  async fillCheckoutInformation(info: CheckoutInfo) {
    await test.step('Fill checkout information', async () => {
      await this.checkoutPage.fillInformation(info);
    });
  }

  async completeOrder() {
    await test.step('Complete the order', async () => {
      await this.checkoutPage.finish();
    });
  }

  async verifyOrderSuccess() {
    await test.step('Verify order confirmation message', async () => {
      await this.checkoutPage.expectOrderComplete();
    });
  }
}
