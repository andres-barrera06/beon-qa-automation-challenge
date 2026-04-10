import { test, expect } from '@playwright/test';
import { AuthClient } from '../api/auth.client';
import { BookingClient } from '../api/booking.client';
import { Credentials } from '../models/user.model';
import { Booking } from '../models/booking.model';

export class BookingSteps {
  private token = '';
  private bookingId = 0;

  constructor(
    private authClient: AuthClient,
    private bookingClient: BookingClient,
  ) {}

  async authenticate(credentials: Credentials) {
    await test.step('Authenticate and obtain token', async () => {
      this.token = await this.authClient.authenticate(credentials);
    });
  }

  async createBooking(booking: Booking) {
    await test.step('Create a new booking', async () => {
      const created = await this.bookingClient.create(booking);
      this.bookingId = created.bookingid;
    });
  }

  async verifyBookingData(booking: Booking) {
    await test.step('Read booking and validate every field matches the payload', async () => {
      const fetched = await this.bookingClient.getById(this.bookingId);
      expect(fetched).toMatchObject({
        firstname: booking.firstname,
        lastname: booking.lastname,
        totalprice: booking.totalprice,
        depositpaid: booking.depositpaid,
        bookingdates: {
          checkin: booking.bookingdates.checkin,
          checkout: booking.bookingdates.checkout,
        },
        additionalneeds: booking.additionalneeds,
      });
    });
  }

  async updateBooking(booking: Booking) {
    await test.step('Update booking and validate the checkout date was changed', async () => {
      const updated = await this.bookingClient.update(this.bookingId, booking, this.token);
      expect(updated.bookingdates.checkout).toBe(booking.bookingdates.checkout);
      expect(updated).toMatchObject({
        firstname: booking.firstname,
        lastname: booking.lastname,
        totalprice: booking.totalprice,
        depositpaid: booking.depositpaid,
        bookingdates: {
          checkin: booking.bookingdates.checkin,
          checkout: booking.bookingdates.checkout,
        },
        additionalneeds: booking.additionalneeds,
      });
    });
  }

  async deleteAndVerify() {
    await test.step('Delete booking and verify removal', async () => {
      await this.bookingClient.remove(this.bookingId, this.token);
      await this.bookingClient.verifyDeleted(this.bookingId);
    });
  }
}
