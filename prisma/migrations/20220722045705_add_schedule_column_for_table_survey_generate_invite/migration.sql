/*
  Warnings:

  - Added the required column `schedule` to the `survey_generate_invite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "survey_generate_invite" ADD COLUMN     "schedule" TEXT NOT NULL;
