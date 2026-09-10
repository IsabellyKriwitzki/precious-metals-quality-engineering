import { expect, Page } from '@playwright/test';

export class ProductPage {
  constructor(private readonly page: Page) {}

  readonly price = this.page.locator('#price');
  readonly quantity = this.page.locator('#quantity');
  readonly total = this.page.locator('#total');
  readonly buyButton = this.page.getByRole('button', { name: 'Place order' });
  readonly message = this.page.locator('#message');

  async open() {
    await this.page.goto('/');
  }

  async setQuantity(quantity: number) {
    await this.quantity.fill(String(quantity));
  }

  async placeOrder() {
    await this.buyButton.click();
  }

  async expectTotal(expected: string) {
    await expect(this.total).toHaveText(expected);
  }
}