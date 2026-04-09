import { expect } from '@playwright/test';
import { ENV } from '../config/env.config';
import { Credentials } from '../models/user.model';
import { AuthResponse } from '../models/booking.model';
import { BaseClient } from './base.client';

export class AuthClient extends BaseClient {
  constructor() {
    super(ENV.api.baseURL);
  }

  async authenticate(credentials: Credentials): Promise<string> {
    const response = await this.post('/auth', credentials);
    expect(response.status()).toBe(200);

    const body: AuthResponse = await response.json();
    return body.token;
  }
}
