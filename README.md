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

| Command | Description |
|---|---|
| `npm test` | Run all tests |
| `npm run test:ui` | UI tests only (headless) |
| `npm run test:api` | API tests only |
| `npm run test:ui:headed` | UI tests with visible browser |
| `npm run test:headed` | All tests with visible browser |
| `npm run test:debug` | Debug mode with Playwright Inspector |
| `npm run report` | Open HTML report |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |

## Framework Architecture

```
src/
├── config/
│   └── env.config.ts              # Centralized URLs per environment
├── models/
│   ├── booking.model.ts           # TypeScript interfaces for API entities
│   └── user.model.ts              # Credentials, CheckoutInfo types
├── data/
│   ├── users.data.ts              # Test data for UI and API users
│   └── bookings.data.ts           # Booking payloads (create, update)
├── selectors/                     # Locator definitions (separated from pages)
│   ├── login.selectors.ts
│   ├── inventory.selectors.ts
│   ├── cart.selectors.ts
│   └── checkout.selectors.ts
├── pages/                         # Page Object Model (UI interactions)
│   ├── base.page.ts
│   ├── login.page.ts
│   ├── inventory.page.ts
│   ├── cart.page.ts
│   └── checkout.page.ts
├── api/                           # API Client Layer
│   ├── base.client.ts
│   ├── auth.client.ts
│   └── booking.client.ts
├── steps/                         # Business flow steps with test.step()
│   ├── login.steps.ts
│   ├── inventory.steps.ts
│   ├── cart.steps.ts
│   ├── checkout.steps.ts
│   └── booking.steps.ts
└── fixtures/
    ├── ui.fixture.ts              # Injects page objects into UI tests
    └── api.fixture.ts             # Injects API clients into API tests
tests/
├── ui/
│   └── checkout.spec.ts           # E2E purchase flow on SauceDemo
└── api/
    └── booking.spec.ts            # Full booking lifecycle (CRUD)
```

## Design Principles

### Layered Architecture: Selectors -> Pages -> Steps -> Tests

Each layer has a single responsibility, following the **Single Responsibility Principle (SRP)** from SOLID:

**Selectors** define *where* the elements are. All locators use resilient `data-test` attributes, centralized in one place per page. If the UI changes a selector, you update one file.

```ts
// src/selectors/login.selectors.ts
export const LoginSelectors = {
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
} as const;
```

**Pages** define *how* to interact with elements. They only contain actions: `click()`, `fill()`, `locator()`. They import selectors but have no business logic.

```ts
// src/pages/login.page.ts
async login(credentials: Credentials) {
  await this.page.locator(LoginSelectors.usernameInput).fill(credentials.username);
  await this.page.locator(LoginSelectors.passwordInput).fill(credentials.password);
  await this.page.locator(LoginSelectors.loginButton).click();
}
```

**Steps** define *what* business flow to execute. They wrap page calls inside `test.step()` for readable HTML reports and reusable flows.

```ts
// src/steps/login.steps.ts
async loginWithCredentials(credentials: Credentials) {
  await test.step(`Login with user "${credentials.username}"`, async () => {
    await this.loginPage.login(credentials);
  });
}
```

**Tests** define *which* scenario to validate. They only orchestrate steps — no direct page interactions, no selectors, no low-level actions.

```ts
// tests/ui/checkout.spec.ts
await loginSteps.navigateToLogin();
await loginSteps.loginWithCredentials(users.standard);
await inventorySteps.addItemsToCart([0, 1]);
await checkoutSteps.verifyOrderSuccess();
```

### Abstract Base Classes (DRY)

`BasePage` and `BaseClient` provide shared functionality so child classes only define their specific behavior:

- **BasePage**: common helpers like `waitForPageLoad()` and `screenshot()`
- **BaseClient**: typed HTTP methods (`get`, `post`, `put`, `delete`) with base URL and headers preconfigured

### Playwright Fixtures (Dependency Injection)

Custom fixtures handle creation and cleanup of page objects and API clients automatically. Tests receive them as parameters — no manual instantiation, no cleanup boilerplate. API clients also auto-dispose their request contexts after each test.

### Typed Models & Separated Data

TypeScript interfaces enforce the shape of API payloads and responses. Test data lives in dedicated files (`users.data.ts`, `bookings.data.ts`), using camelCase naming convention consistently across the project.

### Resilient Locators

All selectors use `data-test` attributes instead of brittle CSS classes or XPath. This makes tests stable against UI changes that don't affect functionality.

## CI Pipeline

GitHub Actions runs automatically on every push to `main` and on pull requests:

```
lint ──────┐
           ├──> test-api  (artifact: api-test-report)
type-check ┤
           └──> test-ui   (artifact: ui-test-report)
```

| Job | Description |
|---|---|
| **ESLint** | Static analysis with `typescript-eslint` |
| **TypeScript** | Type checking with `tsc --noEmit` |
| **API Tests** | Booking lifecycle tests, uploads HTML report |
| **UI Smoke Tests** | E2E purchase flow, uploads HTML report |

Test reports are uploaded as artifacts on every run (even on failure) with 14-day retention. Download them from the Actions tab.

## Test Reporting

The HTML report shows each test with collapsible steps for clear debugging:

```
E2E Purchase Flow
  ├── Navigate to login page
  ├── Login with user "standard_user"
  ├── Add 2 items to cart
  ├── Navigate to shopping cart
  ├── Validate cart has 2 items
  ├── Proceed to checkout
  ├── Fill checkout information
  ├── Complete the order
  └── Verify order confirmation message
```

View the report locally after running tests:

```bash
npm run report
```

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
