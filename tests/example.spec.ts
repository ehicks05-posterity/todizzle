import { expect, test } from '@playwright/test';

const HOME = "http://localhost:5173"

test('has title', async ({ page }) => {
  await page.goto(HOME);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/todizzle/);
});

test('get started link', async ({ page }) => {
  await page.goto(HOME);

  // Click the get started link.
  await page.getByRole('button', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
});
