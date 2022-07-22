-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "receiver_id" UUID;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
