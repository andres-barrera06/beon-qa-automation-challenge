import { test } from '../../src/fixtures/ui.fixture';
import { users, checkoutInfo } from '../../src/data/users.data';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login(users.standard);
  });

  test('E2E Purchase Flow', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addItemByIndex(0);
    await inventoryPage.addItemByIndex(1);
    await inventoryPage.goToCart();

    await cartPage.validateItemCount(2);
    await cartPage.checkout();

    await checkoutPage.fillInformation(checkoutInfo);
    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();
  });
});
