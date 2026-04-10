import { test } from '../../src/fixtures/api.fixture';
import { apiAdmin } from '../../src/data/users.data';
import { defaultBooking, updatedBooking } from '../../src/data/bookings.data';
import { BookingSteps } from '../../src/steps/booking.steps';

test.describe('Booking API', () => {
  test('Full Booking Lifecycle', async ({ authClient, bookingClient, logger }) => {
    const bookingSteps = new BookingSteps(authClient, bookingClient, logger);

    await bookingSteps.authenticate(apiAdmin);
    await bookingSteps.createBooking(defaultBooking);
    await bookingSteps.verifyBookingData(defaultBooking);
    await bookingSteps.updateBooking(updatedBooking);
    await bookingSteps.deleteAndVerify();
  });
});
