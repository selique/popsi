/*
  Warnings:

  - You are about to drop the column `A` on the `_survey_invited` table. All the data in the column will be lost.
  - You are about to drop the column `B` on the `_survey_invited` table. All the data in the column will be lost.
  - Added the required column `survey_generate_invite_id` to the `_survey_invited` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "survey_invited_status" AS ENUM ('PENDING', 'FINISHED', 'FINISHED_LATE', 'LATE', 'EXPIRED');

-- DropForeignKey
ALTER TABLE "_survey_invited" DROP CONSTRAINT "_survey_invited_A_fkey";

-- DropForeignKey
ALTER TABLE "_survey_invited" DROP CONSTRAINT "_survey_invited_B_fkey";

-- AlterTable
ALTER TABLE "_survey_invited" DROP COLUMN "A",
DROP COLUMN "B",
ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "survey_invited_status" DEFAULT 'PENDING',
ADD COLUMN     "survey_generate_invite_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "survey_generate_invite" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "patient_id" UUID NOT NULL,
    "survey_id" UUID NOT NULL,
    "allow_reply_later" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "survey_generate_invite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "survey_generate_invite_id_key" ON "survey_generate_invite"("id");

-- AddForeignKey
ALTER TABLE "survey_generate_invite" ADD CONSTRAINT "survey_generate_invite_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survey_generate_invite" ADD CONSTRAINT "survey_generate_invite_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_survey_invited" ADD CONSTRAINT "_survey_invited_survey_generate_invite_id_fkey" FOREIGN KEY ("survey_generate_invite_id") REFERENCES "survey_generate_invite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
