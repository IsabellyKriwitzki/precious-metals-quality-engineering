import { test, expect } from '@playwright/test';

test.describe('Products API', () => {
  test('returns available products with current price information', async ({ request }) => {
    const response = await request.get('/api/products');

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body.currency).toBe('EUR');
    expect(body.priceTimestamp).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);
    expect(body.products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'GOLD-1OZ',
          metal: 'Gold',
          available: true
        })
      ])
    );
  });

  test('returns 404 for an unknown product', async ({ request }) => {
    const response = await request.get('/api/products/UNKNOWN');

    expect(response.status()).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: 'PRODUCT_NOT_FOUND' });
  });
});