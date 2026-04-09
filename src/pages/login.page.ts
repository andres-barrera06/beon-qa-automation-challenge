import { ENV } from '../config/env.config';
import { Credentials } from '../models/user.model';
import { LoginSelectors } from '../selectors/login.selectors';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  async navigate() {
    await this.page.goto(ENV.ui.baseURL);
  }

  async login(credentials: Credentials) {
    await this.page.locator(LoginSelectors.usernameInput).fill(credentials.username);
    await this.page.locator(LoginSelectors.passwordInput).fill(credentials.password);
    await this.page.locator(LoginSelectors.loginButton).click();
  }

  async getErrorText(): Promise<string> {
    return this.page.locator(LoginSelectors.errorMessage).innerText();
  }
}
