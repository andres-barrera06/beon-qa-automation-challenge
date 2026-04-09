import { expect } from '@playwright/test';
import { CartSelectors as S } from '../selectors/cart.selectors';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  async validateItemCount(count: number) {
    await expect(this.page.locator(S.CART_ITEM)).toHaveCount(count);
  }

  async getItemNames(): Promise<string[]> {
    return this.page.locator(S.ITEM_NAME).allInnerTexts();
  }

  async removeItemByIndex(index: number) {
    await this.page.locator(S.CART_ITEM).nth(index)
      .getByRole('button', { name: S.REMOVE_BUTTON })
      .click();
  }

  async checkout() {
    await this.page.locator(S.CHECKOUT_BUTTON).click();
  }

  async continueShopping() {
    await this.page.locator(S.CONTINUE_SHOPPING_BUTTON).click();
  }
}
