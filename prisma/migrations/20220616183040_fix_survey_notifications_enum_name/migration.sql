/*
  Warnings:

  - The `for` column on the `surveys_notifications` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "surveys_notifications_for" AS ENUM ('MEDIC', 'PATIENT');

-- AlterTable
ALTER TABLE "surveys_notifications" DROP COLUMN "for",
ADD COLUMN     "for" "surveys_notifications_for" NOT NULL DEFAULT E'PATIENT';

-- DropEnum
DROP TYPE "surveys_notifications_fr=om";
