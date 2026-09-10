import { ProductPage } from '../../pages/ProductPage';
import { test, expect } from '@playwright/test';

test.describe('Gold purchase UI', () => {
  test('calculates the total when quantity changes', async ({ page }) => {
    const product = new ProductPage(page);

    await product.open();
    await product.setQuantity(2);

    await product.expectTotal('4.700,00 €');
  });

  test('confirms a valid purchase', async ({ page }) => {
    const product = new ProductPage(page);

    await product.open();
    await product.setQuantity(1);
    await product.placeOrder();

    await product.message.waitFor();
    await product.message.textContent().then(text => {
      if (!text?.startsWith('Order ORD-')) throw new Error(`Unexpected confirmation: ${text}`);
    });
  });

  test('does not silently accept an invalid quantity', async ({ page }) => {
    const product = new ProductPage(page);

    await product.open();
    await product.setQuantity(0);
    await product.placeOrder();

    // The UI should not report a successful order for an invalid quantity.
    await expect(product.message).not.toHaveText(/confirmed/i);
  });
});