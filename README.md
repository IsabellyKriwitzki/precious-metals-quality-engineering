# Precious Metals — Quality Engineering & Test Automation

> **Independent QA demonstration project** focused on testing a digital precious-metals investment platform.

[![Playwright](https://img.shields.io/badge/Playwright-1.62.1-45ba4b)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Test%20Automation-3178C6)](https://www.typescriptlang.org/)

## About the project

This project demonstrates how I would approach quality engineering for a digital platform that supports precious-metals products and investment workflows.

It focuses on the areas where defects can have the highest business impact:

- real-time/dynamic pricing;
- order calculation and transaction integrity;
- API and UI consistency;
- authorization;
- negative scenarios;
- regression automation;
- CI/CD quality gates.

**Important:** This is an independent demo. It is **not affiliated with, connected to, or based on internal systems of SOLIT or any other company.**

## Tech stack

- **Playwright + TypeScript** — UI, API and E2E automation
- **Node.js + Express** — lightweight demo application/API
- **GitHub Actions** — CI execution
- **Page Object Model** — maintainable UI abstraction
- **Risk-based testing** — prioritization by business impact

## Test architecture

```text
                ┌──────────────────────┐
                │   Playwright Tests   │
                └──────────┬───────────┘
                           │
          ┌────────────────┼────────────────┐
          ↓                ↓                ↓
      UI Tests         API Tests         E2E Tests
          │                │                │
          └────────────────┼────────────────┘
                           ↓
                 Demo Application/API
                           ↓
                  Business Rules
```

## Current automated coverage

### API
- Product availability and price response
- Unknown product handling
- Valid order creation
- Total calculation
- Invalid quantity
- Declined payment
- Authorization boundary

### UI
- Product price display
- Quantity/total calculation
- Successful purchase
- Invalid quantity behavior

### E2E
- Critical purchase path
- Cross-layer price/total validation

## Why these tests?

I intentionally did not maximize the number of automated tests. The goal is to demonstrate **test selection based on risk**.

For a financial/precious-metals workflow, I would prioritize:

1. price accuracy;
2. calculation accuracy;
3. transaction integrity;
4. authorization;
5. payment behavior;
6. end-to-end regression coverage.

## Run locally

Requirements:

- Node.js 20+
- npm

Install dependencies:

```bash
npm install
npx playwright install --with-deps chromium
```

Run the application and tests:

```bash
npm test
```

Run only API tests:

```bash
npm run test:api
```

Run only UI tests:

```bash
npm run test:ui
```

Open the HTML report:

```bash
npm run report
```

## CI/CD

Every push and pull request can execute the automated suite through GitHub Actions.

The pipeline is intentionally designed around fast feedback:

```text
Checkout
  ↓
Install dependencies
  ↓
Install browser
  ↓
Run automated tests
  ↓
Upload Playwright report
```

See `.github/workflows/tests.yml`.

## Next improvements

If this were evolved into a production-grade framework, I would add:

- authentication fixtures;
- API schema validation;
- richer test-data management;
- database-level verification;
- contract testing;
- mobile device coverage;
- performance tests with k6;
- accessibility checks;
- security testing;
- parallel environment management;
- Allure reporting;
- flaky-test monitoring;
- service virtualization for external price/payment providers.

## QA mindset

The main principle behind this project is:

> **Automate the checks that provide fast, reliable feedback on the highest business risks — and keep exploratory testing where human investigation adds the most value.**
