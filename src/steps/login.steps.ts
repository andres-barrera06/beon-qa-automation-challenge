import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { Credentials } from '../models/user.model';
import { Logger } from '../utils/logger';

export class LoginSteps {
  constructor(private loginPage: LoginPage, private logger: Logger) {}

  async navigateToLogin() {
    await test.step('Navigate to login page', async () => {
      this.logger.step('Navigating to login page');
      await this.loginPage.navigate();
    });
  }

  async loginWithCredentials(credentials: Credentials) {
    await test.step(`Login with user "${credentials.username}"`, async () => {
      this.logger.step(`Logging in with user "${credentials.username}"`);
      await this.loginPage.login(credentials);
    });
  }
}
