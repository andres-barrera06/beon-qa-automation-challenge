import { Credentials, CheckoutInfo } from '../models/user.model';

export const users: Record<string, Credentials> = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
};

export const api_admin: Credentials = {
  username: 'admin',
  password: 'password123',
};

export const checkoutInfo: CheckoutInfo = {
  firstName: 'Andres',
  lastName: 'Barrera',
  zipCode: '05001',
};
