import { test, expect } from '../../src/fixtures/api.fixture';
import { api_admin } from '../../src/data/users.data';
import { default_booking, updated_booking } from '../../src/data/bookings.data';

test.describe('Booking API', () => {
  test('Full Booking Lifecycle', async ({ authClient, bookingClient }) => {
    const token = await authClient.authenticate(api_admin);

    const created = await bookingClient.create(default_booking);
    const bookingId = created.bookingid;

    const fetched = await bookingClient.getById(bookingId);
    expect(fetched.firstname).toBe(default_booking.firstname);
    expect(fetched.lastname).toBe(default_booking.lastname);

    const updated = await bookingClient.update(bookingId, updated_booking, token);
    expect(updated.lastname).toBe(updated_booking.lastname);

    await bookingClient.remove(bookingId, token);
    await bookingClient.verifyDeleted(bookingId);
  });
});
