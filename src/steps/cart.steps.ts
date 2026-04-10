import { test } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { Logger } from '../utils/logger';

export class CartSteps {
  constructor(private cartPage: CartPage, private logger: Logger) {}

  async validateCartItemCount(expectedCount: number) {
    await test.step(`Validate cart has ${expectedCount} items`, async () => {
      this.logger.step(`Validating cart has ${expectedCount} items`);
      await this.cartPage.validateItemCount(expectedCount);
    });
  }

  async proceedToCheckout() {
    await test.step('Proceed to checkout', async () => {
      this.logger.step('Proceeding to checkout');
      await this.cartPage.checkout();
    });
  }
}
