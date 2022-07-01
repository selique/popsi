-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "sender_id" UUID;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
