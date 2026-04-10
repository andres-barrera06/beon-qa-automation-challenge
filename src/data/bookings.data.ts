import { Booking } from '../models/booking.model';

export const defaultBooking: Booking = {
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

export const updatedBooking: Booking = {
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
