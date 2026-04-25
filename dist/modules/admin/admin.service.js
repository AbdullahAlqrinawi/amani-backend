import { env } from '../../config/env.js';
import { signAdminToken } from '../../utils/jwt.js';
export async function loginAdmin(input) {
    const isValid = input.email === env.ADMIN_EMAIL && input.password === env.ADMIN_PASSWORD;
    if (!isValid) {
        throw new Error('Invalid email or password');
    }
    const admin = {
        email: env.ADMIN_EMAIL,
        role: 'ADMIN',
    };
    const token = signAdminToken(admin);
    return {
        token,
        admin,
    };
}
//# sourceMappingURL=admin.service.js.map