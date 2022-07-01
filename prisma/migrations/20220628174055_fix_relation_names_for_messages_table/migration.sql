/*
  Warnings:

  - You are about to drop the column `medic_id` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `patient_id` on the `messages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_medic_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_patient_id_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "medic_id",
DROP COLUMN "patient_id",
ADD COLUMN     "receiver_id" UUID,
ADD COLUMN     "sender_id" UUID;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
