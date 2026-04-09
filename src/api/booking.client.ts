import { expect } from '@playwright/test';
import { ENV } from '../config/env.config';
import { Booking, BookingResponse } from '../models/booking.model';
import { BaseClient } from './base.client';

export class BookingClient extends BaseClient {
  constructor() {
    super(ENV.api.baseURL);
  }

  private authHeaders(token: string) {
    return { headers: { Cookie: `token=${token}` } };
  }

  async create(booking: Booking): Promise<BookingResponse> {
    const response = await this.post('/booking', booking);
    expect(response.status()).toBe(200);
    return response.json();
  }

  async getById(id: number): Promise<Booking> {
    const response = await this.get(`/booking/${id}`);
    expect(response.status()).toBe(200);
    return response.json();
  }

  async update(id: number, booking: Booking, token: string): Promise<Booking> {
    const response = await this.put(`/booking/${id}`, booking, this.authHeaders(token));
    expect(response.status()).toBe(200);
    return response.json();
  }

  async remove(id: number, token: string): Promise<void> {
    const response = await this.delete(`/booking/${id}`, this.authHeaders(token));
    expect(response.status()).toBe(201);
  }

  async verifyDeleted(id: number): Promise<void> {
    const response = await this.get(`/booking/${id}`);
    expect(response.status()).toBe(404);
  }
}
