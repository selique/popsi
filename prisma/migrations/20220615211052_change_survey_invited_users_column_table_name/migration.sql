/*
  Warnings:

  - You are about to drop the `_invited` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_invited" DROP CONSTRAINT "_invited_A_fkey";

-- DropForeignKey
ALTER TABLE "_invited" DROP CONSTRAINT "_invited_B_fkey";

-- DropTable
DROP TABLE "_invited";

-- CreateTable
CREATE TABLE "_survey_invited" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_survey_invited_AB_unique" ON "_survey_invited"("A", "B");

-- CreateIndex
CREATE INDEX "_survey_invited_B_index" ON "_survey_invited"("B");

-- AddForeignKey
ALTER TABLE "_survey_invited" ADD CONSTRAINT "_survey_invited_A_fkey" FOREIGN KEY ("A") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_survey_invited" ADD CONSTRAINT "_survey_invited_B_fkey" FOREIGN KEY ("B") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE CASCADE;
