-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('NEW', 'OPEN', 'IN_REVIEW', 'RESOLVED', 'ESCALATED');

-- CreateEnum
CREATE TYPE "ReportPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "SenderType" AS ENUM ('CHILD', 'ADMIN', 'SYSTEM');

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "caseCode" TEXT NOT NULL,
    "anonymousUserId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "ageGroup" TEXT,
    "language" TEXT NOT NULL DEFAULT 'ar',
    "status" "ReportStatus" NOT NULL DEFAULT 'NEW',
    "priority" "ReportPriority" NOT NULL DEFAULT 'MEDIUM',
    "assignedTo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportMessage" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "sender" "SenderType" NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReportMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_caseCode_key" ON "Report"("caseCode");

-- CreateIndex
CREATE INDEX "Report_caseCode_idx" ON "Report"("caseCode");

-- CreateIndex
CREATE INDEX "Report_status_idx" ON "Report"("status");

-- CreateIndex
CREATE INDEX "Report_priority_idx" ON "Report"("priority");

-- CreateIndex
CREATE INDEX "Report_createdAt_idx" ON "Report"("createdAt");

-- CreateIndex
CREATE INDEX "ReportMessage_reportId_idx" ON "ReportMessage"("reportId");

-- CreateIndex
CREATE INDEX "ReportMessage_createdAt_idx" ON "ReportMessage"("createdAt");

-- AddForeignKey
ALTER TABLE "ReportMessage" ADD CONSTRAINT "ReportMessage_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
