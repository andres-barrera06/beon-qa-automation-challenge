import { test } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { logger } from '../utils/logger';

export class CartSteps {
  constructor(private cartPage: CartPage) {}

  async validateCartItemCount(expectedCount: number) {
    await test.step(`Validate cart has ${expectedCount} items`, async () => {
      logger.step(`Validating cart has ${expectedCount} items`);
      await this.cartPage.validateItemCount(expectedCount);
    });
  }

  async proceedToCheckout() {
    await test.step('Proceed to checkout', async () => {
      logger.step('Proceeding to checkout');
      await this.cartPage.checkout();
    });
  }
}
