import { expect } from '@playwright/test';
import { InventorySelectors as S } from '../selectors/inventory.selectors';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  async addItemByIndex(index: number) {
    await this.page.locator(S.ITEM).nth(index)
      .getByRole('button', { name: S.ADD_TO_CART_BUTTON })
      .click();
  }

  async removeItemByIndex(index: number) {
    await this.page.locator(S.ITEM).nth(index)
      .getByRole('button', { name: S.REMOVE_BUTTON })
      .click();
  }

  async getItemCount(): Promise<number> {
    return this.page.locator(S.ITEM).count();
  }

  async getCartBadgeCount(): Promise<string> {
    return this.page.locator(S.CART_BADGE).innerText();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.locator(S.SORT_DROPDOWN).selectOption(option);
  }

  async goToCart() {
    await this.page.locator(S.CART_LINK).click();
  }

  async expectItemsVisible() {
    await expect(this.page.locator(S.ITEM).first()).toBeVisible();
  }
}
