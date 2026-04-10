import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { Credentials } from '../models/user.model';

export class LoginSteps {
  constructor(private loginPage: LoginPage) {}

  async navigateToLogin() {
    await test.step('Navigate to login page', async () => {
      await this.loginPage.navigate();
    });
  }

  async loginWithCredentials(credentials: Credentials) {
    await test.step(`Login with user "${credentials.username}"`, async () => {
      await this.loginPage.login(credentials);
    });
  }
}
