import { test } from '../../src/fixtures/ui.fixture';
import { USERS, CHECKOUT_INFO } from '../../src/data/users.data';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login(USERS.standard);
  });

  test('E2E Purchase Flow', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.addItemByIndex(0);
    await inventoryPage.addItemByIndex(1);
    await inventoryPage.goToCart();

    await cartPage.validateItemCount(2);
    await cartPage.checkout();

    await checkoutPage.fillInformation(CHECKOUT_INFO);
    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();
  });
});
