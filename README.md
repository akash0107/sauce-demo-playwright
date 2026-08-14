# Sauce Demo Playwright Automation

[![Playwright Tests](https://github.com/akash0107/sauce-demo-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/akash0107/sauce-demo-playwright/actions/workflows/playwright.yml)

An end-to-end Playwright test suite for [Sauce Demo](https://www.saucedemo.com/), the public e-commerce practice site. A single scenario logs in, randomly picks one product from the inventory, adds it to the cart, and drives the checkout flow through to confirmation — built with a page object model so the test itself reads like a spec, not a script.

## Why this exists

It's a small, self-contained reference for structuring a Playwright suite the way a real project would: page objects for maintainability, a randomized-but-deterministic flow to prove the automation isn't just matching a fixed happy path, HTML/trace/video artifacts on failure, and a CI workflow that runs the suite on every push and pull request.

## Features

- **Page object model** — `LoginPage`, `InventoryPage`, `CartPage`, and `CheckoutPage` each own their locators and actions, keeping the test file declarative.
- **Randomized product selection** — a different item is added to the cart on every run, so the test validates behavior rather than one hard-coded path.
- **Full checkout flow** — login → inventory → cart → checkout details → order confirmation, with assertions at every URL transition.
- **Rich failure diagnostics** — traces on first retry, screenshots on failure, and video retained on failure, all wired through the Playwright HTML reporter.
- **CI-ready** — a GitHub Actions workflow ([`.github/workflows/playwright.yml`](.github/workflows/playwright.yml)) installs dependencies and runs the suite on `push`/`pull_request`, uploading the HTML report as a build artifact.

## Tech stack

| | |
|---|---|
| Test framework | [Playwright Test](https://playwright.dev/) `^1.54` |
| Language | JavaScript (ES modules) |
| Browser | Chromium (Desktop Chrome profile) |
| CI | GitHub Actions |
| Target app | [saucedemo.com](https://www.saucedemo.com/) |

## Project structure

```text
.
├── page-objects/
│   ├── LoginPage.js       # Login form interactions
│   ├── InventoryPage.js   # Product listing + random selection
│   ├── CartPage.js        # Cart contents + checkout entry point
│   └── CheckoutPage.js    # Checkout form + order confirmation
├── tests/
│   └── sauce-demo.spec.js # The end-to-end purchase flow
├── .github/workflows/
│   └── playwright.yml     # CI: install, run tests, upload HTML report
├── playwright.config.js   # Browser, timeouts, reporter, artifact settings
└── package.json
```

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Install the Chromium browser (with OS-level deps)
npx playwright install --with-deps chromium
```

If your npm registry access is restricted, make sure it's allowed before running the install.

## Running the tests

```bash
npm test              # run the suite
npm run test:headed   # run with the browser window visible
npm run test:debug    # run with Playwright Inspector
npm run report        # open the last HTML report
```

> **Note:** `playwright.config.js` currently sets `headless: false`, so the browser window is visible by default even via `npm test`. Tests also run with `--workers=1` (serial) rather than in parallel — useful for watching the flow locally, but worth revisiting for CI, since GitHub Actions runners have no display server and headed Chromium typically needs a virtual framebuffer (e.g. `xvfb-run`) to launch there.

## Test flow

1. Open the Sauce Demo login page
2. Log in with the standard test account
3. Select a random product from the inventory and add it to the cart
4. Open the cart and confirm the selected item is present
5. Proceed to checkout and fill in the shipping details
6. Complete the order and verify the confirmation message

## Default credentials

Sauce Demo's standard test account (public, non-sensitive):

| Field | Value |
|---|---|
| Username | `standard_user` |
| Password | `secret_sauce` |

## Continuous integration

Every push and pull request to `main`/`master` triggers [`playwright.yml`](.github/workflows/playwright.yml), which installs dependencies, installs the Chromium browser, runs `npm test`, and uploads the resulting HTML report as a workflow artifact (30-day retention) — regardless of whether the run passed or failed.

## License

No license file is included yet — add one (MIT is a common default for demo/reference projects like this) if you intend others to reuse this code.
