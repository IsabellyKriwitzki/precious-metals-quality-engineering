import { test, expect } from '@playwright/test';
import { testData } from '../../fixtures/testData';

test.describe('Orders API', () => {
  test('creates a confirmed gold order and calculates the total correctly', async ({ request }) => {
    const response = await request.post('/api/orders', {
      data: {
        userId: testData.user.id,
        productId: testData.gold.id,
        quantity: testData.gold.quantity
      }
    });

    expect(response.status()).toBe(201);
    const order = await response.json();

    expect(order).toMatchObject({
      userId: testData.user.id,
      productId: testData.gold.id,
      quantity: 2,
      unitPrice: 2350,
      total: 4700,
      status: 'CONFIRMED'
    });
  });

  test('rejects zero quantity', async ({ request }) => {
    const response = await request.post('/api/orders', {
      data: {
        userId: testData.user.id,
        productId: testData.gold.id,
        quantity: 0
      }
    });

    expect(response.status()).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: 'INVALID_QUANTITY' });
  });

  test('rejects a declined payment', async ({ request }) => {
    const response = await request.post('/api/orders', {
      data: {
        userId: testData.user.id,
        productId: testData.gold.id,
        quantity: 1,
        paymentStatus: 'DECLINED'
      }
    });

    expect(response.status()).toBe(402);
    await expect(response.json()).resolves.toEqual({ error: 'PAYMENT_DECLINED' });
  });

  test('prevents one user from accessing another user order', async ({ request }) => {
    const create = await request.post('/api/orders', {
      data: {
        userId: testData.user.id,
        productId: testData.gold.id,
        quantity: 1
      }
    });
    const order = await create.json();

    const response = await request.get(`/api/orders/${order.id}`, {
      headers: { 'x-user-id': testData.user.unauthorizedUser }
    });

    expect(response.status()).toBe(403);
    await expect(response.json()).resolves.toEqual({ error: 'FORBIDDEN' });
  });
});