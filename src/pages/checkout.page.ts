import { expect } from '@playwright/test';
import { CheckoutInfo } from '../models/user.model';
import { CheckoutSelectors as S } from '../selectors/checkout.selectors';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  async fillInformation(info: CheckoutInfo) {
    await this.page.locator(S.FIRST_NAME_INPUT).fill(info.firstName);
    await this.page.locator(S.LAST_NAME_INPUT).fill(info.lastName);
    await this.page.locator(S.ZIP_CODE_INPUT).fill(info.zipCode);
    await this.page.locator(S.CONTINUE_BUTTON).click();
  }

  async finish() {
    await this.page.locator(S.FINISH_BUTTON).click();
  }

  async getTotalPrice(): Promise<string> {
    return this.page.locator(S.SUMMARY_TOTAL).innerText();
  }

  async expectOrderComplete() {
    await expect(this.page.locator(S.SUCCESS_MESSAGE)).toBeVisible();
  }
}
