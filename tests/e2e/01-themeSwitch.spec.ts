import { test } from '@playwright/test';

test('主题切换', async ({ page }) => {
  await page.goto('/zh');
  await page.getByRole('img', { name: 'moon-outline' }).click();
  await page.getByRole('img', { name: 'sun-outline' }).click();
});