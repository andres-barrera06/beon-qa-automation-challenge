import { test } from '../../src/fixtures/ui.fixture';
import { users, checkoutInfo } from '../../src/data/users.data';
import { LoginSteps } from '../../src/steps/login.steps';
import { InventorySteps } from '../../src/steps/inventory.steps';
import { CartSteps } from '../../src/steps/cart.steps';
import { CheckoutSteps } from '../../src/steps/checkout.steps';

test.describe('Checkout Flow', () => {
  test('E2E Purchase Flow', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    const loginSteps = new LoginSteps(loginPage);
    const inventorySteps = new InventorySteps(inventoryPage);
    const cartSteps = new CartSteps(cartPage);
    const checkoutSteps = new CheckoutSteps(checkoutPage);

    await loginSteps.navigateToLogin();
    await loginSteps.loginWithCredentials(users.standard);

    await inventorySteps.addItemsToCart([0, 1]);
    await inventorySteps.navigateToCart();

    await cartSteps.validateCartItemCount(2);
    await cartSteps.proceedToCheckout();

    await checkoutSteps.fillCheckoutInformation(checkoutInfo);
    await checkoutSteps.completeOrder();
    await checkoutSteps.verifyOrderSuccess();
  });
});
