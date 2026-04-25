export function successResponse(res, statusCode, message, data = null) {
    return res.status(statusCode).json({
        error: false,
        message,
        data,
    });
}
export function errorResponse(res, statusCode, message, details = null) {
    return res.status(statusCode).json({
        error: true,
        message,
        details,
    });
}
//# sourceMappingURL=apiResponse.js.map