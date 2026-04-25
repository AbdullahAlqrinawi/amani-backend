import { errorResponse, successResponse } from '../../utils/apiResponse.js';
import { addReportMessage, createReport, getReportByCaseCode, listReports, updateReportPriority, updateReportStatus, } from './report.service.js';
function getCaseCodeParam(req, res) {
    const caseCode = req.params['caseCode'];
    if (typeof caseCode !== 'string' || caseCode.trim().length === 0) {
        errorResponse(res, 400, 'Case code is required');
        return null;
    }
    return caseCode;
}
export async function createReportController(req, res) {
    const report = await createReport(req.body);
    return successResponse(res, 201, 'Report created successfully', {
        caseCode: report.caseCode,
        report,
    });
}
export async function listReportsController(req, res) {
    const reports = await listReports({
        status: req.query.status,
        priority: req.query.priority,
        category: req.query.category,
    });
    return successResponse(res, 200, 'Reports fetched successfully', {
        reports,
    });
}
export async function getReportController(req, res) {
    const caseCode = getCaseCodeParam(req, res);
    if (!caseCode)
        return;
    const report = await getReportByCaseCode(caseCode);
    if (!report) {
        return errorResponse(res, 404, 'Report not found');
    }
    return successResponse(res, 200, 'Report fetched successfully', {
        report,
    });
}
export async function addMessageController(req, res) {
    const caseCode = getCaseCodeParam(req, res);
    if (!caseCode)
        return;
    const message = await addReportMessage(caseCode, req.body);
    return successResponse(res, 201, 'Message added successfully', {
        message,
    });
}
export async function getMessagesController(req, res) {
    const caseCode = getCaseCodeParam(req, res);
    if (!caseCode)
        return;
    const report = await getReportByCaseCode(caseCode);
    if (!report) {
        return errorResponse(res, 404, 'Report not found');
    }
    return successResponse(res, 200, 'Messages fetched successfully', {
        messages: report.messages,
    });
}
export async function updateStatusController(req, res) {
    const caseCode = getCaseCodeParam(req, res);
    if (!caseCode)
        return;
    const report = await updateReportStatus(caseCode, req.body.status);
    return successResponse(res, 200, 'Report status updated successfully', {
        report,
    });
}
export async function updatePriorityController(req, res) {
    const caseCode = getCaseCodeParam(req, res);
    if (!caseCode)
        return;
    const report = await updateReportPriority(caseCode, req.body.priority);
    return successResponse(res, 200, 'Report priority updated successfully', {
        report,
    });
}
//# sourceMappingURL=report.controller.js.map