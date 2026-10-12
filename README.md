# Playwright 101 Assignment — TestMu AI Certification

Automates the 3 required scenarios on the TestMu AI Selenium Playground using
**Playwright (JavaScript)** and runs them **in parallel on two browser/OS
combinations** on the TestMu AI cloud grid.

| Scenario | Page | What it checks |
|---|---|---|
| 1 | Simple Form Demo | URL contains `simple-form-demo`; the typed message appears under **Your Message:** |
| 2 | Drag & Drop Sliders | Slider "Default value 15" is dragged to **95** and the range value shows 95 |
| 3 | Input Form Submit | Empty submit shows a validation error; filled form (Country = "United States" by text) shows the success message |

## Cloud browser / OS combinations (run in parallel)

| Project name (in `playwright.config.js`) | Browser | OS |
|---|---|---|
| `pw-chromium:latest:Windows 10@lambdatest` | Chromium | Windows 10 |
| `pw-firefox:latest:macOS Catalina@lambdatest` | Firefox | macOS Catalina |

3 tests × 2 combinations = **6 parallel cloud sessions** (`fullyParallel: true`, `workers: 6`).

## Capabilities enabled on every run

`network: true` (network logs) · `video: true` (video recording) · `console: true` (console logs) · `visual: true` (screenshots) — set in `lambdatest-setup.js`.
Each test also attaches its own screenshots to the HTML report.

## Locators used (5 different types)

| Type | Example |
|---|---|
| Role | `getByRole('button', { name: 'Get Checked Value' })` |
| Placeholder | `getByPlaceholder('Please enter your Message')` |
| Text | `getByText('Thanks for contacting us, we will get back to you shortly.')` |
| CSS | `locator('input[type="range"]')`, `locator('select', { has: ... })` |
| XPath | `locator("xpath=//a[normalize-space()='Simple Form Demo']")` |

## Setup

1. Install **Node.js 18+**.
2. Sign up at TestMu AI with the **same email you used for the certification registration** (100 free automation minutes).
3. Install dependencies and the Playwright browsers:
   ```bash
   npm install
   npx playwright install chromium
   ```
   (Playwright starts a throw-away local browser for its fixtures even in cloud mode, so the one-time browser install is needed.)
4. Add your credentials (TestMu AI → Profile → Account Settings → Password & Security):
   ```bash
   cp .env.example .env      # on Windows: copy .env.example .env
   ```
   then edit `.env` and set `LT_USERNAME` and `LT_ACCESS_KEY`.
   **Never commit `.env`** — it is already in `.gitignore`.

## Run

```bash
npm test                 # all 3 scenarios x 2 browser/OS combos, in parallel on TestMu AI
npm run test:local       # optional: same tests on your own machine (no credentials needed)
npm run report           # open the local HTML report
```

## Where to find the results / Test Session IDs

1. Open the TestMu AI **Automation Dashboard** → **Builds** → **"Playwright 101 Assignment"**.
2. You will see 6 sessions (3 tests × 2 browser/OS combos), each with video, network logs, console logs and screenshots.
3. Open each session and copy its **Test / Session ID** (shown on the test details page and in the page URL).
4. Submit the GitHub repo URL and all Session IDs on the exam portal.

## Push to GitHub and share privately

```bash
git init
git add .
git commit -m "Playwright 101 assignment"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then on GitHub: **Repo → Settings → Collaborators → Add people →** `admin@testmuaicertifications.com`
(keep the repository **Private**).

## Submission checklist

- [ ] Ran `npm test` and all 6 sessions show **Passed** on the TestMu AI dashboard
- [ ] Video, network logs, console logs and screenshots are visible in each session
- [ ] `.env` is **not** in the repo (no credentials pushed)
- [ ] Repository is private and shared with `admin@testmuaicertifications.com`
- [ ] GitHub repo URL + all Test Session IDs submitted on the exam portal
- [ ] Submitted within 36 hours of the deadline

## Troubleshooting

| Problem | Fix |
|---|---|
| `LT_USERNAME and LT_ACCESS_KEY are not set` | Create `.env` from `.env.example` and fill it in |
| Grid rejects a platform / browser string | Copy the exact values from the TestMu AI **Automation Capabilities Generator** and update the project names in `playwright.config.js` (e.g. `macOS Ventura` instead of `macOS Catalina`) |
| Sessions stay "queued" | Your plan limits parallel sessions — lower `workers` in `playwright.config.js` |
| Out of automation minutes | Email `admin@testmuaicertifications.com` or `support@testmuai.com` to extend the trial |
| Connection / version error on the grid | Pin an earlier Playwright, e.g. `npm i -D @playwright/test@<previous-version>` |
| Scenario 3 error-message assertion fails | The test reads the browser's built-in validation text and matches `/please fill/i`; check the exact wording in the failing session video and adjust the regex in `tests/scenario3-input-form.spec.js` |


1st_code:
<img width="1920" height="1008" alt="image" src="https://github.com/user-attachments/assets/233eacbd-97c1-436b-921b-94deac27a130" />

2nd code:
<img width="956" height="479" alt="image" src="https://github.com/user-attachments/assets/72203216-745c-4c63-a07f-159feb61961f" />

<img width="955" height="467" alt="image" src="https://github.com/user-attachments/assets/718f4ecb-d770-400c-a919-ec59b96825e6" />

3rd code: 
<img width="958" height="473" alt="image" src="https://github.com/user-attachments/assets/c70a9d50-b736-4714-a938-9b31fb39050a" />

<img width="952" height="477" alt="image" src="https://github.com/user-attachments/assets/69b08a2e-1e33-40fb-9e39-31139d5740d9" />



