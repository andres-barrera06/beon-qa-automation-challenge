import { test } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';

export class InventorySteps {
  constructor(private inventoryPage: InventoryPage) {}

  async addItemsToCart(indexes: number[]): Promise<string[]> {
    const addedItemNames: string[] = [];
    await test.step(`Add ${indexes.length} items to cart`, async () => {
      for (const index of indexes) {
        addedItemNames.push(await this.inventoryPage.getItemNameByIndex(index));
        await this.inventoryPage.addItemByIndex(index);
      }
    });
    return addedItemNames;
  }

  async navigateToCart() {
    await test.step('Navigate to shopping cart', async () => {
      await this.inventoryPage.goToCart();
    });
  }
}
