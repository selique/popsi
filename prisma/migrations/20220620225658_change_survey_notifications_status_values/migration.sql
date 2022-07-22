/*
  Warnings:

  - The values [READED] on the enum `surveys_notifications_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "surveys_notifications_status_new" AS ENUM ('SENT', 'IN_PROGRESS', 'FINISHED');
ALTER TABLE "surveys_notifications" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "surveys_notifications" ALTER COLUMN "status" TYPE "surveys_notifications_status_new" USING ("status"::text::"surveys_notifications_status_new");
ALTER TYPE "surveys_notifications_status" RENAME TO "surveys_notifications_status_old";
ALTER TYPE "surveys_notifications_status_new" RENAME TO "surveys_notifications_status";
DROP TYPE "surveys_notifications_status_old";
ALTER TABLE "surveys_notifications" ALTER COLUMN "status" SET DEFAULT 'SENT';
COMMIT;
