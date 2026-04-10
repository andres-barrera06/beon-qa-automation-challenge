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
    await test.step('Read booking and validate data', async () => {
      const fetched = await this.bookingClient.getById(this.bookingId);
      expect(fetched.firstname).toBe(booking.firstname);
      expect(fetched.lastname).toBe(booking.lastname);
    });
  }

  async updateBooking(booking: Booking) {
    await test.step('Update booking details', async () => {
      const updated = await this.bookingClient.update(this.bookingId, booking, this.token);
      expect(updated.lastname).toBe(booking.lastname);
    });
  }

  async deleteAndVerify() {
    await test.step('Delete booking and verify removal', async () => {
      await this.bookingClient.remove(this.bookingId, this.token);
      await this.bookingClient.verifyDeleted(this.bookingId);
    });
  }
}
