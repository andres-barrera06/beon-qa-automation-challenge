import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  private readonly inventoryItems = this.page.locator('.inventory_item');
  private readonly cartBadge = this.page.locator('.shopping_cart_badge');
  private readonly cartLink = this.page.locator('.shopping_cart_link');
  private readonly sortDropdown = this.page.locator('[data-test="product-sort-container"]');

  async addItemByIndex(index: number) {
    await this.inventoryItems.nth(index)
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async removeItemByIndex(index: number) {
    await this.inventoryItems.nth(index)
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async getItemCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  async getCartBadgeCount(): Promise<string> {
    return this.cartBadge.innerText();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async expectItemsVisible() {
    await expect(this.inventoryItems.first()).toBeVisible();
  }
}
