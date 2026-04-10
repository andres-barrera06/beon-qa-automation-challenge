import { expect } from '@playwright/test';
import { CartSelectors } from '../selectors/cart.selectors';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  async validateItemCount(count: number) {
    await expect(this.page.locator(CartSelectors.cartItem)).toHaveCount(count);
  }

  async validateContents(expectedNames: string[]) {
    await expect(this.page.locator(CartSelectors.cartItem)).toHaveCount(expectedNames.length);
    await expect(this.page.locator(CartSelectors.cartItemName)).toHaveText(expectedNames);
  }

  async getItemNames(): Promise<string[]> {
    return this.page.locator(CartSelectors.cartItemName).allInnerTexts();
  }

  async removeItemByIndex(index: number) {
    await this.page.locator(CartSelectors.cartItem).nth(index)
      .getByRole('button', { name: CartSelectors.removeButton })
      .click();
  }

  async checkout() {
    await this.page.locator(CartSelectors.checkoutButton).click();
  }

  async continueShopping() {
    await this.page.locator(CartSelectors.continueShoppingButton).click();
  }
}
