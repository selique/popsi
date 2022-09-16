/*
  Warnings:

  - Added the required column `position` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "position" TEXT NOT NULL;
