import { successResponse } from '../../utils/apiResponse.js';
import { loginAdmin } from './admin.service.js';
export async function loginController(req, res) {
    const result = await loginAdmin(req.body);
    return successResponse(res, 200, 'Login successful', result);
}
export async function meController(req, res) {
    return successResponse(res, 200, 'Admin profile', {
        admin: req.admin,
    });
}
//# sourceMappingURL=admin.controller.js.map