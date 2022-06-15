-- CreateEnum
CREATE TYPE "surveys_notifications_status" AS ENUM ('CREATED', 'READED');

-- CreateTable
CREATE TABLE "surveys_notifications" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "status" "surveys_notifications_status" NOT NULL DEFAULT E'CREATED',
    "medic_id" UUID,
    "patient_id" UUID,
    "surveys_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "surveys_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "surveys_notifications_id_key" ON "surveys_notifications"("id");

-- AddForeignKey
ALTER TABLE "surveys_notifications" ADD CONSTRAINT "surveys_notifications_medic_id_fkey" FOREIGN KEY ("medic_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys_notifications" ADD CONSTRAINT "surveys_notifications_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys_notifications" ADD CONSTRAINT "surveys_notifications_surveys_id_fkey" FOREIGN KEY ("surveys_id") REFERENCES "surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
