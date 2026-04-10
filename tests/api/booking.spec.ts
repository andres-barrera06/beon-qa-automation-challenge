import { test, expect } from '../../src/fixtures/api.fixture';
import { apiAdmin } from '../../src/data/users.data';
import { defaultBooking, updatedBooking } from '../../src/data/bookings.data';

test.describe('Booking API', () => {
  test('Full Booking Lifecycle', async ({ authClient, bookingClient }) => {
    const token = await authClient.authenticate(apiAdmin);

    const created = await bookingClient.create(defaultBooking);
    const bookingId = created.bookingid;

    const fetched = await bookingClient.getById(bookingId);
    expect(fetched.firstname).toBe(defaultBooking.firstname);
    expect(fetched.lastname).toBe(defaultBooking.lastname);

    const updated = await bookingClient.update(bookingId, updatedBooking, token);
    expect(updated.lastname).toBe(updatedBooking.lastname);

    await bookingClient.remove(bookingId, token);
    await bookingClient.verifyDeleted(bookingId);
  });
});
