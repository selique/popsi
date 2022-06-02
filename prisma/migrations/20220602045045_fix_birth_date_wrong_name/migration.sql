/*
  Warnings:

  - You are about to drop the column `brith_date` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `birth_date` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "brith_date",
ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL;
