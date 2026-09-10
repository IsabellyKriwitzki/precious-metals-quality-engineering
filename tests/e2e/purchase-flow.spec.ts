import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';

test('critical path: current gold price -> quantity -> calculated total -> confirmed order', async ({ page, request }) => {
  const product = new ProductPage(page);

  const apiResponse = await request.get('/api/products/GOLD-1OZ');
  expect(apiResponse.ok()).toBeTruthy();
  const apiBody = await apiResponse.json();

  await product.open();

  await expect(product.price).toContainText('2.350');
  await product.setQuantity(2);

  await product.expectTotal('4.700,00 €');
  await product.placeOrder();

  await expect(product.message).toContainText('confirmed');

  // Cross-layer validation: UI purchase is backed by the same business API.
  const createResponse = await request.post('/api/orders', {
    data: { userId: 'user-100', productId: apiBody.product.id, quantity: 2 }
  });
  expect(createResponse.status()).toBe(201);

  const order = await createResponse.json();
  expect(order.total).toBe(apiBody.product.price * 2);
});