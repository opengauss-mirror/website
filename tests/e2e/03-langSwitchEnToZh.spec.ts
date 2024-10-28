import { test } from '@playwright/test';

test('中英文切换：英->中', async ({ page }) => {
  await page.goto('/en');
  await page.getByRole('img', { name: 'chevron-down' }).click();
  await page.getByText('中文').click();
  await page.getByRole('img', { name: 'chevron-down' }).click();
  await page.getByText('English').click();
});