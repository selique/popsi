/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `_survey_invited` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `_survey_invited` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "_survey_invited" DROP CONSTRAINT "_survey_invited_A_fkey";

-- DropForeignKey
ALTER TABLE "_survey_invited" DROP CONSTRAINT "_survey_invited_B_fkey";

-- DropIndex
DROP INDEX "_survey_invited_AB_unique";

-- DropIndex
DROP INDEX "_survey_invited_B_index";

-- AlterTable
ALTER TABLE "_survey_invited" ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "_survey_invited_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "_survey_invited_id_key" ON "_survey_invited"("id");

-- AddForeignKey
ALTER TABLE "_survey_invited" ADD CONSTRAINT "_survey_invited_A_fkey" FOREIGN KEY ("A") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_survey_invited" ADD CONSTRAINT "_survey_invited_B_fkey" FOREIGN KEY ("B") REFERENCES "surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
