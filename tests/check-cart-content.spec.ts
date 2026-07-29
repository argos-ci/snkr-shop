import { expect, test } from '@playwright/test';

test.skip('Cart is filled', async ({ page }) => {
  await page.goto('/cart');
  const cartItem = page.getByRole('listitem');
  await expect(cartItem).toContainText('The Air Jordan 1 Retro High');
  await expect(cartItem).toContainText('$180');
  await expect(page.getByText('TOTAL PRICE : $180')).toBeVisible();
});
