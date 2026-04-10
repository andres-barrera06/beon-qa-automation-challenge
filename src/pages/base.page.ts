import { Page } from '@playwright/test';

/**
 * Abstract parent for every Page Object.
 *
 * Holds the Playwright `Page` instance and exposes helpers that are shared
 * across all pages (navigation waits, screenshots, title). Subclasses should
 * only add page-specific actions — never duplicate what lives here.
 */
export abstract class BasePage {
  constructor(protected page: Page) {}

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async screenshot(name: string) {
    await this.page.screenshot({ path: `test-results/screenshots/${name}.png` });
  }
}
