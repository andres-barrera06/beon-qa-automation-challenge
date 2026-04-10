import { Page } from '@playwright/test';
import { logger } from './logger';

export async function takeScreenshot(page: Page, name: string) {
  const path = `test-results/screenshots/${name}.png`;
  await page.screenshot({ path });
  logger.info(`Screenshot saved: ${path}`);
}
