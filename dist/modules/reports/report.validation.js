import { z } from 'zod';
export const createReportSchema = z.object({
    anonymousUserId: z.string().min(1),
    category: z.string().min(1),
    ageGroup: z.string().optional(),
    language: z.enum(['ar', 'en']).default('ar'),
    initialMessage: z.string().min(1),
});
export const createMessageSchema = z.object({
    message: z.string().min(1),
    sender: z.enum(['CHILD', 'ADMIN']).default('CHILD'),
});
export const updateStatusSchema = z.object({
    status: z.enum(['NEW', 'OPEN', 'IN_REVIEW', 'RESOLVED', 'ESCALATED']),
});
export const updatePrioritySchema = z.object({
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
});
//# sourceMappingURL=report.validation.js.map