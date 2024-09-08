import { test } from '@playwright/test';

test('中英文切换：中->英', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('http://localhost:5173/zh/');
  await page.getByRole('img', { name: 'chevron-down' }).click();
  await page.getByText('English').click();
  await page.getByRole('img', { name: 'chevron-down' }).click();
  await page.getByText('中文').click();
});