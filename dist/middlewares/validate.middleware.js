export function validateBody(schema) {
    return (req, res, next) => {
        req.body = schema.parse(req.body);
        next();
    };
}
//# sourceMappingURL=validate.middleware.js.map