# Sauce Demo Playwright Automation

This project contains a Playwright JavaScript test framework that exercises the public Sauce Demo website. It logs in, randomly selects one product from the inventory, adds it to the cart, and completes the checkout flow.

## Features

- Best-practice Playwright configuration
- Page object model for readability and maintainability
- Randomized product selection for robust flow validation
- End-to-end checkout automation against `https://www.saucedemo.com/`
- HTML report generation for local viewing

## Prerequisites

- Node.js 18+
- npm

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Install Playwright browsers:

   ```bash
   npx playwright install --with-deps chromium
   ```

3. If the npm registry is blocked in your environment, ensure your local registry access is allowed before installation.

## Run the test

```bash
npm test
```

To run in headed mode:

```bash
npm run test:headed
```

To view the HTML report:

```bash
npm run report
```

## Test flow

The automation does the following:

1. Opens the Sauce Demo site
2. Logs in with the standard user account
3. Chooses a random product from the inventory
4. Adds it to the cart
5. Opens the cart and proceeds to checkout
6. Fills in the checkout form
7. Verifies the purchase is completed

## Default credentials

- Username: `standard_user`
- Password: `secret_sauce`

## Project structure

```text
.
├── package.json
├── playwright.config.js
├── README.md
├── .gitignore
├── page-objects/
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── tests/
│   └── sauce-demo.spec.js
└── playwright-report/
```

## GitHub push steps

To publish this repository to GitHub:

```bash
git remote add origin https://github.com/<your-user>/<your-repo>.git
git branch -M main
git push -u origin main
```

If you use GitHub CLI:

```bash
gh auth login
gh repo create <your-repo> --public --source=. --remote=origin --push
```

## Notes

- The test is intentionally written with a page object model to keep the logic clean and maintainable.
- The product selection is randomized, but the flow remains deterministic because it validates the expected cart and completion states.
- The flow was manually validated in the browser against Sauce Demo: login succeeded, a product was added, checkout completed, and the order confirmation page displayed "Thank you for your order!".
