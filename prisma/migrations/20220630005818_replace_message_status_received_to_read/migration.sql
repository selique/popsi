/*
  Warnings:

  - The values [RECEIVED] on the enum `messages_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "messages_status_new" AS ENUM ('PENDING', 'SENT', 'READ');
ALTER TABLE "messages" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "messages" ALTER COLUMN "status" TYPE "messages_status_new" USING ("status"::text::"messages_status_new");
ALTER TYPE "messages_status" RENAME TO "messages_status_old";
ALTER TYPE "messages_status_new" RENAME TO "messages_status";
DROP TYPE "messages_status_old";
ALTER TABLE "messages" ALTER COLUMN "status" SET DEFAULT 'SENT';
COMMIT;
