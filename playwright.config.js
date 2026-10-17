import { defineConfig, devices } from '@playwright/test';

// Set this to a Render preview URL to test a deployed app instead of a local build.
const remoteURL = process.env.PLAYWRIGHT_BASE_URL;
const localURL = 'http://127.0.0.1:4173';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: remoteURL ? 120_000 : 30_000,
  globalTimeout: 5 * 60_000,
  reporter: [[process.env.CI ? 'github' : 'list'], ['html', { open: 'never' }]],
  use: {
    baseURL: remoteURL || localURL,
    navigationTimeout: remoteURL ? 90_000 : 30_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Build each time so local runs cannot accidentally test stale output.
  // This first smoke test covers public UI only; no API or database is needed.
  webServer: remoteURL
    ? undefined
    : {
        command:
          'npm run build-client && npm run preview --prefix client -- --host 127.0.0.1 --port 4173 --strictPort',
        url: localURL,
        reuseExistingServer: false,
        timeout: 120_000,
      },
});
