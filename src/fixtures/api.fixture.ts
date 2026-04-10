import { test as base } from '@playwright/test';
import { AuthClient } from '../api/auth.client';
import { BookingClient } from '../api/booking.client';

/**
 * API test fixture.
 *
 * Injects API clients with their full lifecycle managed automatically:
 * `init()` runs before the test (creating the request context) and
 * `dispose()` runs after (releasing it). Tests never touch request contexts
 * directly — they just receive a ready-to-use client and get a clean
 * instance per test, which keeps tests isolated.
 */
type APIFixtures = {
  authClient: AuthClient;
  bookingClient: BookingClient;
};

export const test = base.extend<APIFixtures>({
  authClient: async ({}, use) => {
    const client = new AuthClient();
    await client.init();
    await use(client);
    await client.dispose();
  },
  bookingClient: async ({}, use) => {
    const client = new BookingClient();
    await client.init();
    await use(client);
    await client.dispose();
  },
});

export { expect } from '@playwright/test';
