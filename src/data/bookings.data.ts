import { Booking } from '../models/booking.model';

export const DEFAULT_BOOKING: Booking = {
  firstname: 'Andres',
  lastname: 'Barrera',
  totalprice: 100,
  depositpaid: true,
  bookingdates: {
    checkin: '2024-01-01',
    checkout: '2024-01-10',
  },
  additionalneeds: 'Breakfast',
};

export const UPDATED_BOOKING: Booking = {
  firstname: 'Andres',
  lastname: 'Updated',
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: '2024-01-01',
    checkout: '2024-02-01',
  },
  additionalneeds: 'Lunch',
};
