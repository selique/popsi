/*
  Warnings:

  - The values [BOOLEAN,SCALE] on the enum `answer_types` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "answer_types_new" AS ENUM ('TEXT', 'MULTIPLE_CHOICE', 'SINGLE_CHOICE', 'RATING');
ALTER TABLE "questions" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "questions" ALTER COLUMN "type" TYPE "answer_types_new" USING ("type"::text::"answer_types_new");
ALTER TYPE "answer_types" RENAME TO "answer_types_old";
ALTER TYPE "answer_types_new" RENAME TO "answer_types";
DROP TYPE "answer_types_old";
COMMIT;

-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "description" TEXT,
ALTER COLUMN "type" DROP DEFAULT;
