import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { Credentials } from '../models/user.model';
import { logger } from '../utils/logger';

export class LoginSteps {
  constructor(private loginPage: LoginPage) {}

  async navigateToLogin() {
    await test.step('Navigate to login page', async () => {
      logger.step('Navigating to login page');
      await this.loginPage.navigate();
    });
  }

  async loginWithCredentials(credentials: Credentials) {
    await test.step(`Login with user "${credentials.username}"`, async () => {
      logger.step(`Logging in with user "${credentials.username}"`);
      await this.loginPage.login(credentials);
    });
  }
}
