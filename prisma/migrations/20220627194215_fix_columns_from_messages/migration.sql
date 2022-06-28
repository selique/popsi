/*
  Warnings:

  - You are about to drop the column `content` on the `messages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "messages" DROP COLUMN "content",
ADD COLUMN     "audio" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "message" TEXT,
ADD COLUMN     "video" TEXT;
