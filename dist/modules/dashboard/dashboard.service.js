import { prisma } from '../../db/prisma.js';
export async function getDashboardStats() {
    const [totalReports, newReports, openReports, resolvedReports, criticalReports, activeChats,] = await Promise.all([
        prisma.report.count(),
        prisma.report.count({ where: { status: 'NEW' } }),
        prisma.report.count({ where: { status: 'OPEN' } }),
        prisma.report.count({ where: { status: 'RESOLVED' } }),
        prisma.report.count({ where: { priority: 'CRITICAL' } }),
        prisma.report.count({
            where: {
                status: {
                    in: ['NEW', 'OPEN', 'IN_REVIEW'],
                },
            },
        }),
    ]);
    return {
        totalReports,
        newReports,
        openReports,
        resolvedReports,
        criticalReports,
        activeChats,
    };
}
//# sourceMappingURL=dashboard.service.js.map