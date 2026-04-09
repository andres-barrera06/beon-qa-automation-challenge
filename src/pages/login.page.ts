import { ENV } from '../config/env.config';
import { Credentials } from '../models/user.model';
import { LoginSelectors as S } from '../selectors/login.selectors';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  async navigate() {
    await this.page.goto(ENV.ui.baseURL);
  }

  async login(credentials: Credentials) {
    await this.page.locator(S.USERNAME_INPUT).fill(credentials.username);
    await this.page.locator(S.PASSWORD_INPUT).fill(credentials.password);
    await this.page.locator(S.LOGIN_BUTTON).click();
  }

  async getErrorText(): Promise<string> {
    return this.page.locator(S.ERROR_MESSAGE).innerText();
  }
}
