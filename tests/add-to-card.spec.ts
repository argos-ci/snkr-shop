import { argosScreenshot } from '@argos-ci/playwright';
import { expect, test } from '@playwright/test';

test('Add to cart', async ({ page }) => {
  await page.goto('/sneakers/485842');
  await page.getByRole('button', { name: 'ADD TO CART' }).click();
  const toast = page.getByRole('status');
  await expect(toast).toContainText('Added to cart.');
  await argosScreenshot(page, 'added-to-cart');

  await page.getByRole('link', { name: 'Cart' }).click();
  await page.waitForURL('**/cart');
  // await argosScreenshot(page, 'filled-cart');
});
