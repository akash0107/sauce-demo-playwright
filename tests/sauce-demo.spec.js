import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage.js';
import { InventoryPage } from '../page-objects/InventoryPage.js';
import { CartPage } from '../page-objects/CartPage.js';
import { CheckoutPage } from '../page-objects/CheckoutPage.js';

test.describe('Sauce Demo end-to-end purchase flow', () => {
  test('logs in, adds a random product, and completes checkout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/\/inventory\.html/);

    const selectedProduct = await inventoryPage.selectRandomProduct();
    await expect(inventoryPage.cartBadge).toBeVisible();

    await inventoryPage.viewCart();
    await expect(page).toHaveURL(/\/cart\.html/);
    await cartPage.expectCartContainsItem(selectedProduct.itemName);
    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/\/checkout-step-one\.html/);
    await checkoutPage.fillForm('John', 'Doe', '10001');

    await expect(page).toHaveURL(/\/checkout-step-two\.html/);
    await checkoutPage.finishCheckout();

    await expect(page).toHaveURL(/\/checkout-complete\.html/);
    await checkoutPage.expectCompletion();
  });
});
