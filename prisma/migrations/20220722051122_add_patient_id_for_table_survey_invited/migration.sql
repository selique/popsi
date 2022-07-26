/*
  Warnings:

  - Added the required column `patient_id` to the `_survey_invited` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "_survey_invited" ADD COLUMN     "patient_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "_survey_invited" ADD CONSTRAINT "_survey_invited_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
