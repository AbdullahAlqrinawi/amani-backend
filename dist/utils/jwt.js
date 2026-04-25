import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
export function signAdminToken(payload) {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN,
    });
}
export function verifyAdminToken(token) {
    return jwt.verify(token, env.JWT_SECRET);
}
//# sourceMappingURL=jwt.js.map