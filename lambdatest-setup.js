/**
 * lambdatest-setup.js
 * ---------------------------------------------------------------------------
 * Custom Playwright fixture that runs every test on the TestMu AI
 * (formerly LambdaTest) cloud grid.
 *
 * - Import `test` from THIS file in your specs (not from "@playwright/test").
 * - Each project in playwright.config.js is named
 *       <browserName>:<browserVersion>:<platform>@lambdatest
 *   e.g.  pw-chromium:latest:Windows 10@lambdatest
 *   The name is parsed below and turned into the grid capabilities.
 * - A project whose name does NOT contain "lambdatest" runs on your own
 *   machine instead (used by playwright.local.config.js for debugging).
 * ---------------------------------------------------------------------------
 */
const base = require('@playwright/test');
const path = require('path');

// A fresh capabilities object is built for every test, so parallel tests can
// never overwrite each other's browser / platform / name.
function buildCapabilities(projectName, testName) {
  const [browserName, browserVersion, platform] = projectName
    .split('@lambdatest')[0]
    .split(':');

  return {
    browserName: browserName || 'pw-chromium', // Chrome | MicrosoftEdge | pw-chromium | pw-firefox | pw-webkit
    browserVersion: browserVersion || 'latest',
    'LT:Options': {
      platform: platform || 'Windows 10',
      build: process.env.LT_BUILD_NAME || 'Playwright 101 Assignment',
      name: testName,
      user: process.env.LT_USERNAME,
      accessKey: process.env.LT_ACCESS_KEY,

      // ---- Required by the assignment: all four must be enabled ----------
      network: true, // network logs
      video: true,   // video recording
      console: true, // console logs
      visual: true,  // step-by-step screenshots
      // --------------------------------------------------------------------

      tunnel: false, // only needed for locally hosted apps
    },
  };
}

const test = base.test.extend({
  page: async ({ page }, use, testInfo) => {
    const isCloudProject = testInfo.project.name.includes('lambdatest');

    // Local run (playwright.local.config.js) -> use the normal local page
    if (!isCloudProject) {
      await use(page);
      return;
    }

    if (!process.env.LT_USERNAME || !process.env.LT_ACCESS_KEY) {
      throw new Error(
        'LT_USERNAME and LT_ACCESS_KEY are not set. Copy .env.example to .env and add your TestMu AI credentials.'
      );
    }

    const testName = `${testInfo.title} - ${path.basename(testInfo.file)}`;
    const capabilities = buildCapabilities(testInfo.project.name, testName);

    // Connect to the TestMu AI grid over CDP
    const browser = await base.chromium.connect({
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
        JSON.stringify(capabilities)
      )}`,
    });

    const ltPage = await browser.newPage({ viewport: { width: 1366, height: 768 } });

    // ---- the actual test runs here ----
    await use(ltPage);
    // ------------------------------------

    // Report pass / fail back to the TestMu AI dashboard
    const passed = testInfo.status === 'passed';
    const testStatus = {
      action: 'setTestStatus',
      arguments: {
        status: passed ? 'passed' : 'failed',
        remark: passed
          ? 'All assertions passed'
          : (testInfo.error && testInfo.error.message ? testInfo.error.message : 'Test failed').slice(0, 250),
      },
    };
    await ltPage.evaluate(() => {}, `lambdatest_action: ${JSON.stringify(testStatus)}`);

    await ltPage.close();
    await browser.close();
  },
});

module.exports = { test, expect: base.expect, buildCapabilities };
