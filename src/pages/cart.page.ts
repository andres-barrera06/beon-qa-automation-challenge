import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  private readonly cartItems = this.page.locator('.cart_item');
  private readonly checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
  private readonly continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });

  async validateItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async getItemNames(): Promise<string[]> {
    return this.cartItems.locator('.inventory_item_name').allInnerTexts();
  }

  async removeItemByIndex(index: number) {
    await this.cartItems.nth(index).getByRole('button', { name: 'Remove' }).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
