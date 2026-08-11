import { expect, test } from '@playwright/test';

test('open product detail', async ({ page }) => {
  // Go to sneakers list page
  await page.goto('/sneakers');

  // Click product preview button
  await page
    .locator('div')
    .filter({ hasText: 'Crimson Tint' })
    .filter({ has: page.getByRole('button') })
    .last()
    .getByRole('link', { name: 'Preview' })
    .click();

  // Check the redirection
  await expect(
    page.getByRole('heading', { name: "HIGH OG 'CRIMSON TINT'" }),
  ).toBeVisible();
});
