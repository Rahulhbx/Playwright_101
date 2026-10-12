// playwright.config.js  -  CLOUD run on TestMu AI (default: `npm test`)
require('dotenv').config();
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 120_000,
  expect: { timeout: 15_000 },

  // Run test files AND tests in parallel; each worker = one cloud session
  fullyParallel: true,
  workers: 6, // 3 tests x 2 browser/OS combos = 6 sessions. Lower this if your plan limits parallel sessions.
  retries: 0,

  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    actionTimeout: 30_000,
    navigationTimeout: 60_000,
  },

  // Project name format:  <browser>:<version>:<platform>@lambdatest
  // Browsers: Chrome | MicrosoftEdge | pw-chromium | pw-firefox | pw-webkit
  // If the grid rejects a platform string, copy the exact value from the
  // TestMu AI Automation Capabilities Generator.
  projects: [
    { name: 'pw-chromium:latest:Windows 10@lambdatest' },
    { name: 'chrome:latest:macOS Sonoma@lambdatest' },
  ],
});
