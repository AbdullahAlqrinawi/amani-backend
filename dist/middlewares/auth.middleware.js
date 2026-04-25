import { errorResponse } from '../utils/apiResponse.js';
import { verifyAdminToken } from '../utils/jwt.js';
export function requireAdminAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return errorResponse(res, 401, 'Unauthorized');
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = verifyAdminToken(token);
        req.admin = payload;
        next();
    }
    catch {
        return errorResponse(res, 401, 'Invalid or expired token');
    }
}
//# sourceMappingURL=auth.middleware.js.map