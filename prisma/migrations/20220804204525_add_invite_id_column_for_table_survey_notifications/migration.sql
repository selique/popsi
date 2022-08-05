-- AlterTable
ALTER TABLE "surveys_notifications" ADD COLUMN     "invite_id" UUID;

-- AddForeignKey
ALTER TABLE "surveys_notifications" ADD CONSTRAINT "surveys_notifications_invite_id_fkey" FOREIGN KEY ("invite_id") REFERENCES "_survey_invited"("id") ON DELETE CASCADE ON UPDATE CASCADE;
