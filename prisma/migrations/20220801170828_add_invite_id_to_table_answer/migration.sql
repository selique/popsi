/*
  Warnings:

  - You are about to drop the column `updated_at` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `invite_id` to the `answers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "answers" DROP COLUMN "updated_at",
ADD COLUMN     "invite_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "updated_at";

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_invite_id_fkey" FOREIGN KEY ("invite_id") REFERENCES "_survey_invited"("id") ON DELETE CASCADE ON UPDATE CASCADE;
