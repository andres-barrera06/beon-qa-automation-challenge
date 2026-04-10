import { test } from '@playwright/test';
import { CartPage } from '../pages/cart.page';

export class CartSteps {
  constructor(private cartPage: CartPage) {}

  async validateCartItemCount(expectedCount: number) {
    await test.step(`Validate cart has ${expectedCount} items`, async () => {
      await this.cartPage.validateItemCount(expectedCount);
    });
  }

  async validateCartContents(expectedNames: string[]) {
    await test.step(`Validate cart contains ${expectedNames.length} items: ${expectedNames.join(', ')}`, async () => {
      await this.cartPage.validateContents(expectedNames);
    });
  }

  async proceedToCheckout() {
    await test.step('Proceed to checkout', async () => {
      await this.cartPage.checkout();
    });
  }
}
