// playwright.local.config.js  -  LOCAL debug run (`npm run test:local`)
// Runs the same tests on your own machine, no TestMu AI credentials needed.
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 120_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { screenshot: 'on', video: 'on', trace: 'on' },
  projects: [
    {
      name: 'local-brave',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
      },
    },
  ],
});
