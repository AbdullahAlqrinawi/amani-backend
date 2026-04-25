import { prisma } from '../../db/prisma.js';
import { generateCaseCode } from '../../utils/generateCaseCode.js';
export async function createReport(input) {
    let caseCode = generateCaseCode();
    const existing = await prisma.report.findUnique({
        where: { caseCode },
    });
    if (existing) {
        caseCode = generateCaseCode();
    }
    const report = await prisma.report.create({
        data: {
            caseCode,
            anonymousUserId: input.anonymousUserId,
            category: input.category,
            ageGroup: input.ageGroup,
            language: input.language,
            messages: {
                create: {
                    sender: 'CHILD',
                    message: input.initialMessage,
                },
            },
        },
        include: {
            messages: true,
        },
    });
    return report;
}
export async function listReports(query) {
    return prisma.report.findMany({
        where: {
            status: query.status,
            priority: query.priority,
            category: query.category,
        },
        include: {
            messages: {
                orderBy: { createdAt: 'asc' },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
}
export async function getReportByCaseCode(caseCode) {
    return prisma.report.findUnique({
        where: { caseCode },
        include: {
            messages: {
                orderBy: { createdAt: 'asc' },
            },
        },
    });
}
export async function addReportMessage(caseCode, input) {
    const report = await prisma.report.findUnique({
        where: { caseCode },
    });
    if (!report) {
        throw new Error('Report not found');
    }
    const message = await prisma.reportMessage.create({
        data: {
            reportId: report.id,
            sender: input.sender,
            message: input.message,
        },
    });
    await prisma.report.update({
        where: { id: report.id },
        data: {
            status: report.status === 'NEW' ? 'OPEN' : report.status,
        },
    });
    return message;
}
export async function updateReportStatus(caseCode, status) {
    return prisma.report.update({
        where: { caseCode },
        data: { status },
    });
}
export async function updateReportPriority(caseCode, priority) {
    return prisma.report.update({
        where: { caseCode },
        data: { priority },
    });
}
//# sourceMappingURL=report.service.js.map