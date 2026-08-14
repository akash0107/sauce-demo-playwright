export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  async selectRandomProduct() {
    const count = await this.inventoryItems.count();
    const randomIndex = Math.floor(Math.random() * count);
    const selectedItem = this.inventoryItems.nth(randomIndex);

    const itemName = await selectedItem.locator('.inventory_item_name').textContent();
    await selectedItem.locator('button').click();

    return { itemName };
  }

  async viewCart() {
    await this.shoppingCartLink.click();
  }

  async isCartBadgeVisible() {
    return await this.cartBadge.isVisible();
  }
}
