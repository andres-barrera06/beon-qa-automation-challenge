import { test, expect } from '@playwright/test';
import { AuthClient } from '../api/auth.client';
import { BookingClient } from '../api/booking.client';
import { Credentials } from '../models/user.model';
import { Booking } from '../models/booking.model';
import { logger } from '../utils/logger';

export class BookingSteps {
  private token = '';
  private bookingId = 0;

  constructor(
    private authClient: AuthClient,
    private bookingClient: BookingClient,
  ) {}

  async authenticate(credentials: Credentials) {
    await test.step('Authenticate and obtain token', async () => {
      logger.step(`Authenticating with user "${credentials.username}"`);
      this.token = await this.authClient.authenticate(credentials);
      logger.info('Token obtained successfully');
    });
  }

  async createBooking(booking: Booking) {
    await test.step('Create a new booking', async () => {
      logger.step(`Creating booking for ${booking.firstname} ${booking.lastname}`);
      const created = await this.bookingClient.create(booking);
      this.bookingId = created.bookingid;
      logger.info(`Booking created with ID: ${this.bookingId}`);
    });
  }

  async verifyBookingData(booking: Booking) {
    await test.step('Read booking and validate data', async () => {
      logger.step(`Verifying booking ID: ${this.bookingId}`);
      const fetched = await this.bookingClient.getById(this.bookingId);
      expect(fetched.firstname).toBe(booking.firstname);
      expect(fetched.lastname).toBe(booking.lastname);
    });
  }

  async updateBooking(booking: Booking) {
    await test.step('Update booking details', async () => {
      logger.step(`Updating booking ID: ${this.bookingId}`);
      const updated = await this.bookingClient.update(this.bookingId, booking, this.token);
      expect(updated.lastname).toBe(booking.lastname);
      logger.info(`Booking updated — lastname: ${updated.lastname}`);
    });
  }

  async deleteAndVerify() {
    await test.step('Delete booking and verify removal', async () => {
      logger.step(`Deleting booking ID: ${this.bookingId}`);
      await this.bookingClient.remove(this.bookingId, this.token);
      await this.bookingClient.verifyDeleted(this.bookingId);
      logger.info('Booking deleted and verified (404)');
    });
  }
}
