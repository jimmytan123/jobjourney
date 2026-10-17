import { expect, test } from '@playwright/test';

test('visitors can open the landing page and navigate to login', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('JobJourney');
  await expect(
    page.getByRole('heading', { name: 'Job Application Tracking Tool' }),
  ).toBeVisible();

  await page.getByRole('link', { name: 'Login / Demo User', exact: true }).click();
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('heading', { name: 'Login', exact: true })).toBeVisible();
  await expect(page.getByLabel('email', { exact: true })).toBeVisible();
  await expect(page.getByLabel('password', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeEnabled();

  // Verify the host also serves the SPA on direct requests to nested routes.
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Login', exact: true })).toBeVisible();
});
