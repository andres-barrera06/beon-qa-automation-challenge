import { test } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { logger } from '../utils/logger';

export class InventorySteps {
  constructor(private inventoryPage: InventoryPage) {}

  async addItemsToCart(indexes: number[]) {
    await test.step(`Add ${indexes.length} items to cart`, async () => {
      logger.step(`Adding items at indexes [${indexes.join(', ')}] to cart`);
      for (const index of indexes) {
        await this.inventoryPage.addItemByIndex(index);
      }
    });
  }

  async navigateToCart() {
    await test.step('Navigate to shopping cart', async () => {
      logger.step('Navigating to shopping cart');
      await this.inventoryPage.goToCart();
    });
  }
}
