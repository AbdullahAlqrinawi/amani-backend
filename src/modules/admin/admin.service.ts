import { env } from '../../config/env.js';
import { signAdminToken } from '../../utils/jwt.js';

type LoginInput = {
  email: string;
  password: string;
};

export async function loginAdmin(input: LoginInput) {
  const isValid =
    input.email === env.ADMIN_EMAIL && input.password === env.ADMIN_PASSWORD;

  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  const admin = {
    email: env.ADMIN_EMAIL,
    role: 'ADMIN' as const,
  };

  const token = signAdminToken(admin);

  return {
    token,
    admin,
  };
}