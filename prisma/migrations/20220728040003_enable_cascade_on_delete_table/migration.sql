-- DropForeignKey
ALTER TABLE "_survey_invited" DROP CONSTRAINT "_survey_invited_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "_survey_invited" DROP CONSTRAINT "_survey_invited_survey_generate_invite_id_fkey";

-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_profileId_fkey";

-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_questionId_fkey";

-- DropForeignKey
ALTER TABLE "chats" DROP CONSTRAINT "chats_medic_id_fkey";

-- DropForeignKey
ALTER TABLE "chats" DROP CONSTRAINT "chats_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_receiver_id_fkey";

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_sender_id_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_medic_id_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_surveysId_fkey";

-- DropForeignKey
ALTER TABLE "survey_generate_invite" DROP CONSTRAINT "survey_generate_invite_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "survey_generate_invite" DROP CONSTRAINT "survey_generate_invite_survey_id_fkey";

-- DropForeignKey
ALTER TABLE "surveys" DROP CONSTRAINT "surveys_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "surveys_notifications" DROP CONSTRAINT "surveys_notifications_medic_id_fkey";

-- DropForeignKey
ALTER TABLE "surveys_notifications" DROP CONSTRAINT "surveys_notifications_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "surveys_notifications" DROP CONSTRAINT "surveys_notifications_surveys_id_fkey";

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_medic_id_fkey" FOREIGN KEY ("medic_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survey_generate_invite" ADD CONSTRAINT "survey_generate_invite_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survey_generate_invite" ADD CONSTRAINT "survey_generate_invite_survey_id_fkey" FOREIGN KEY ("survey_id") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_survey_invited" ADD CONSTRAINT "_survey_invited_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_survey_invited" ADD CONSTRAINT "_survey_invited_survey_generate_invite_id_fkey" FOREIGN KEY ("survey_generate_invite_id") REFERENCES "survey_generate_invite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys" ADD CONSTRAINT "surveys_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_surveysId_fkey" FOREIGN KEY ("surveysId") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys_notifications" ADD CONSTRAINT "surveys_notifications_medic_id_fkey" FOREIGN KEY ("medic_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys_notifications" ADD CONSTRAINT "surveys_notifications_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys_notifications" ADD CONSTRAINT "surveys_notifications_surveys_id_fkey" FOREIGN KEY ("surveys_id") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_medic_id_fkey" FOREIGN KEY ("medic_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
