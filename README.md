# BEON QA Automation Challenge

## Prerequisites

- **Node.js** >= 18
- **npm** >= 9

## Installation

```bash
git clone https://github.com/andres-barrera06/beon-qa-automation-challenge.git
cd beon-qa-automation-challenge
npm install
npx playwright install chromium
```

## Running Tests

### All Tests
```bash
npm test
```

### UI Tests Only (Headless)
```bash
npm run test:ui
```

### UI Tests (Headed - visible browser)
```bash
npm run test:ui:headed
```

### API Tests Only
```bash
npm run test:api
```

### Debug Mode (step-by-step with Playwright Inspector)
```bash
npm run test:debug
```

### View HTML Report
```bash
npm run report
```

## Framework Architecture

```
src/
├── config/
│   └── env.config.ts           # Centralized URLs per environment
├── models/
│   ├── booking.model.ts        # TypeScript interfaces for API entities
│   └── user.model.ts           # Credentials, CheckoutInfo types
├── data/
│   ├── users.data.ts           # Test data for UI and API users
│   └── bookings.data.ts        # Booking payloads (create, update)
├── pages/                      # Page Object Model (UI)
│   ├── base.page.ts            # Abstract base with shared helpers
│   ├── login.page.ts           # SauceDemo login page
│   ├── inventory.page.ts       # Product listing and cart actions
│   ├── cart.page.ts            # Cart validation and checkout trigger
│   └── checkout.page.ts        # Checkout form and order confirmation
├── api/                        # API Client Layer
│   ├── base.client.ts          # Abstract base with HTTP method wrappers
│   ├── auth.client.ts          # Authentication service (/auth)
│   └── booking.client.ts       # Booking CRUD operations (/booking)
└── fixtures/
    ├── ui.fixture.ts           # Injects page objects into UI tests
    └── api.fixture.ts          # Injects API clients into API tests
tests/
├── ui/
│   └── checkout.spec.ts        # E2E purchase flow on SauceDemo
└── api/
    └── booking.spec.ts         # Full booking lifecycle (CRUD)
```

### Design Decisions

**Page Object Model (POM):** Each page in the UI application is represented by a class that encapsulates its locators and interactions. This keeps tests readable and makes maintenance easier when the UI changes — you update the locator in one place instead of across every test.

**Abstract Base Classes:** Both `BasePage` (UI) and `BaseClient` (API) provide shared functionality. Page objects inherit common helpers like `waitForPageLoad()` and `screenshot()`. API clients inherit typed HTTP methods (`get`, `post`, `put`, `delete`) so each service only defines its business logic.

**Playwright Fixtures:** Instead of manually instantiating page objects or API clients in every test, custom fixtures handle creation and cleanup automatically. This keeps tests focused on behavior, not setup. API clients also auto-dispose their request contexts after each test.

**Typed Models & Separated Data:** TypeScript interfaces enforce the shape of API payloads and responses. Test data lives in dedicated files (`users.data.ts`, `bookings.data.ts`), making it easy to add test variants without touching test logic.

**Project-based Config:** `playwright.config.ts` defines separate projects for UI and API tests, each with appropriate settings (browser + slowMo for UI, HTTP headers for API). This allows running them independently via `npm run test:ui` or `npm run test:api`.

---

## Manual QA Bug Report (problem_user)

Exploratory testing was performed manually on [SauceDemo](https://www.saucedemo.com/) using the `problem_user` credentials.

### Bug #1: Product images are incorrect

| Field | Detail |
|---|---|
| **Title** | Product images do not match their corresponding product names |
| **Severity** | Medium |
| **Steps to Reproduce** | 1. Navigate to https://www.saucedemo.com/ <br> 2. Log in with `problem_user` / `secret_sauce` <br> 3. Observe the product listing on the inventory page |
| **Expected Result** | Each product should display its correct image matching the product name and description |
| **Actual Result** | All products display the same incorrect image (a dog) instead of their actual product images |

### Bug #2: "Add to cart" button is broken for some items

| Field | Detail |
|---|---|
| **Title** | Unable to add certain items to the cart |
| **Severity** | High |
| **Steps to Reproduce** | 1. Log in with `problem_user` / `secret_sauce` <br> 2. Click "Add to cart" on "Sauce Labs Onesie" or other affected items <br> 3. Check the cart |
| **Expected Result** | The selected item should appear in the cart and the button should change to "Remove" |
| **Actual Result** | The item is not added to the cart; the button does not toggle or behaves inconsistently |

### Bug #3: Sorting does not work

| Field | Detail |
|---|---|
| **Title** | Product sorting filter does not reorder items |
| **Severity** | Medium |
| **Steps to Reproduce** | 1. Log in with `problem_user` / `secret_sauce` <br> 2. Select any sort option from the dropdown (e.g., "Price (low to high)") |
| **Expected Result** | Products should reorder according to the selected sort criteria |
| **Actual Result** | Products remain in the same order regardless of the selected filter |
