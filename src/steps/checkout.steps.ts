import { test } from '@playwright/test';
import { CheckoutPage } from '../pages/checkout.page';
import { CheckoutInfo } from '../models/user.model';
import { logger } from '../utils/logger';

export class CheckoutSteps {
  constructor(private checkoutPage: CheckoutPage) {}

  async fillCheckoutInformation(info: CheckoutInfo) {
    await test.step('Fill checkout information', async () => {
      logger.step(`Filling checkout info for ${info.firstName} ${info.lastName}`);
      await this.checkoutPage.fillInformation(info);
    });
  }

  async completeOrder() {
    await test.step('Complete the order', async () => {
      logger.step('Completing the order');
      await this.checkoutPage.finish();
    });
  }

  async verifyOrderSuccess() {
    await test.step('Verify order confirmation message', async () => {
      logger.step('Verifying order confirmation message');
      await this.checkoutPage.expectOrderComplete();
    });
  }
}
