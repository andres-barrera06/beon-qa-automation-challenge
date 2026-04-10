import { Page, TestInfo } from '@playwright/test';
import { Logger } from './logger';

export async function takeScreenshot(page: Page, testInfo: TestInfo, name: string) {
  const logger = new Logger(testInfo);
  const path = `test-results/screenshots/${name}.png`;
  await page.screenshot({ path });
  logger.info(`Screenshot saved: ${path}`);
}
