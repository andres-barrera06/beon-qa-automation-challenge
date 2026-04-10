import { test as base } from '@playwright/test';
import { AuthClient } from '../api/auth.client';
import { BookingClient } from '../api/booking.client';
import { Logger } from '../utils/logger';

type APIFixtures = {
  authClient: AuthClient;
  bookingClient: BookingClient;
  logger: Logger;
};

export const test = base.extend<APIFixtures>({
  logger: async ({}, use, testInfo) => {
    await use(new Logger(testInfo));
  },
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
