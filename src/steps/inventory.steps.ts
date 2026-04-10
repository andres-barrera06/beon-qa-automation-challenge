import { test } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';

export class InventorySteps {
  constructor(private inventoryPage: InventoryPage) {}

  async addItemsToCart(indexes: number[]) {
    await test.step(`Add ${indexes.length} items to cart`, async () => {
      for (const index of indexes) {
        await this.inventoryPage.addItemByIndex(index);
      }
    });
  }

  async navigateToCart() {
    await test.step('Navigate to shopping cart', async () => {
      await this.inventoryPage.goToCart();
    });
  }
}
