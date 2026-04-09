import { test, expect } from '../../src/fixtures/api.fixture';
import { API_ADMIN } from '../../src/data/users.data';
import { DEFAULT_BOOKING, UPDATED_BOOKING } from '../../src/data/bookings.data';

test.describe('Booking API', () => {
  test('Full Booking Lifecycle', async ({ authClient, bookingClient }) => {
    const token = await authClient.authenticate(API_ADMIN);

    const created = await bookingClient.create(DEFAULT_BOOKING);
    const bookingId = created.bookingid;

    const fetched = await bookingClient.getById(bookingId);
    expect(fetched.firstname).toBe(DEFAULT_BOOKING.firstname);
    expect(fetched.lastname).toBe(DEFAULT_BOOKING.lastname);

    const updated = await bookingClient.update(bookingId, UPDATED_BOOKING, token);
    expect(updated.lastname).toBe(UPDATED_BOOKING.lastname);

    await bookingClient.remove(bookingId, token);
    await bookingClient.verifyDeleted(bookingId);
  });
});
