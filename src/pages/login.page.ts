import { ENV } from '../config/env.config';
import { Credentials } from '../models/user.model';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private readonly usernameInput = this.page.getByPlaceholder('Username');
  private readonly passwordInput = this.page.getByPlaceholder('Password');
  private readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  private readonly errorMessage = this.page.locator('[data-test="error"]');

  async navigate() {
    await this.page.goto(ENV.ui.baseURL);
  }

  async login(credentials: Credentials) {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
  }

  async getErrorText(): Promise<string> {
    return this.errorMessage.innerText();
  }
}
