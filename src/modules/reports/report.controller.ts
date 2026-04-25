import { Request, Response } from 'express';
import { errorResponse, successResponse } from '../../utils/apiResponse.js';
import {
  addReportMessage,
  createReport,
  getReportByCaseCode,
  listReports,
  updateReportPriority,
  updateReportStatus,
} from './report.service.js';

export async function createReportController(req: Request, res: Response) {
  const report = await createReport(req.body);

  return successResponse(res, 201, 'Report created successfully', {
    caseCode: report.caseCode,
    report,
  });
}

export async function listReportsController(req: Request, res: Response) {
  const reports = await listReports({
    status: req.query.status as string | undefined,
    priority: req.query.priority as string | undefined,
    category: req.query.category as string | undefined,
  });

  return successResponse(res, 200, 'Reports fetched successfully', {
    reports,
  });
}

export async function getReportController(req: Request, res: Response) {
  const { caseCode } = req.params;

  const report = await getReportByCaseCode(caseCode);

  if (!report) {
    return errorResponse(res, 404, 'Report not found');
  }

  return successResponse(res, 200, 'Report fetched successfully', {
    report,
  });
}

export async function addMessageController(req: Request, res: Response) {
  const { caseCode } = req.params;

  const message = await addReportMessage(caseCode, req.body);

  return successResponse(res, 201, 'Message added successfully', {
    message,
  });
}

export async function getMessagesController(req: Request, res: Response) {
  const { caseCode } = req.params;

  const report = await getReportByCaseCode(caseCode);

  if (!report) {
    return errorResponse(res, 404, 'Report not found');
  }

  return successResponse(res, 200, 'Messages fetched successfully', {
    messages: report.messages,
  });
}

export async function updateStatusController(req: Request, res: Response) {
  const { caseCode } = req.params;

  const report = await updateReportStatus(caseCode, req.body.status);

  return successResponse(res, 200, 'Report status updated successfully', {
    report,
  });
}

export async function updatePriorityController(req: Request, res: Response) {
  const { caseCode } = req.params;

  const report = await updateReportPriority(caseCode, req.body.priority);

  return successResponse(res, 200, 'Report priority updated successfully', {
    report,
  });
}