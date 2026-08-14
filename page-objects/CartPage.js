import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItem = page.locator('.cart_item');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async expectCartContainsItem(itemName) {
    const cartItemText = await this.cartItem.locator('.inventory_item_name').allTextContents();
    expect(cartItemText).toContain(itemName);
  }
}
