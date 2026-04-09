import { Credentials, CheckoutInfo } from '../models/user.model';

export const USERS: Record<string, Credentials> = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
};

export const API_ADMIN: Credentials = {
  username: 'admin',
  password: 'password123',
};

export const CHECKOUT_INFO: CheckoutInfo = {
  firstName: 'Andres',
  lastName: 'Barrera',
  zipCode: '05001',
};
