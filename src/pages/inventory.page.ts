import { expect } from '@playwright/test';
import { InventorySelectors } from '../selectors/inventory.selectors';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  async addItemByIndex(index: number) {
    await this.page.locator(InventorySelectors.inventoryItem).nth(index)
      .getByRole('button', { name: InventorySelectors.addToCartButton })
      .click();
  }

  async removeItemByIndex(index: number) {
    await this.page.locator(InventorySelectors.inventoryItem).nth(index)
      .getByRole('button', { name: InventorySelectors.removeButton })
      .click();
  }

  async getItemCount(): Promise<number> {
    return this.page.locator(InventorySelectors.inventoryItem).count();
  }

  async getCartBadgeCount(): Promise<string> {
    return this.page.locator(InventorySelectors.shoppingCartBadge).innerText();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.locator(InventorySelectors.productSortDropdown).selectOption(option);
  }

  async goToCart() {
    await this.page.locator(InventorySelectors.shoppingCartLink).click();
  }

  async expectItemsVisible() {
    await expect(this.page.locator(InventorySelectors.inventoryItem).first()).toBeVisible();
  }
}
