import { ZodError } from 'zod';
import { errorResponse } from '../utils/apiResponse.js';
export function notFoundMiddleware(req, res) {
    return errorResponse(res, 404, `Route not found: ${req.originalUrl}`);
}
export function errorMiddleware(error, req, res, next) {
    console.error(error);
    if (error instanceof ZodError) {
        return errorResponse(res, 400, 'Validation error', error.flatten());
    }
    if (error instanceof Error) {
        return errorResponse(res, 500, error.message);
    }
    return errorResponse(res, 500, 'Internal server error');
}
//# sourceMappingURL=error.middleware.js.map