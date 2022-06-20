-- CreateEnum
CREATE TYPE "roles" AS ENUM ('PATIENT', 'MEDIC');

-- CreateEnum
CREATE TYPE "answer_types" AS ENUM ('TEXT', 'MULTIPLE_CHOICE', 'SINGLE_CHOICE', 'RATING');

-- CreateEnum
CREATE TYPE "surveys_notifications_status" AS ENUM ('SENT', 'READED');

-- CreateEnum
CREATE TYPE "surveys_notifications_fr=om" AS ENUM ('MEDIC', 'PATITENT');

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "full_name" TEXT,
    "avatar_url" TEXT,
    "bio" TEXT,
    "nickname" TEXT,
    "matrial_status" TEXT,
    "gender" TEXT,
    "gender_identity" TEXT,
    "cpf" TEXT,
    "birth_date" DATE,
    "role" "roles" DEFAULT E'PATIENT',
    "medic_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surveys" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "owner_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" UUID NOT NULL,
    "question" TEXT NOT NULL,
    "description" TEXT,
    "alternatives" TEXT[],
    "type" "answer_types" NOT NULL,
    "surveysId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers" (
    "id" UUID NOT NULL,
    "answer" TEXT[],
    "profileId" UUID NOT NULL,
    "questionId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surveys_notifications" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "status" "surveys_notifications_status" NOT NULL DEFAULT E'SENT',
    "for" "surveys_notifications_fr=om" NOT NULL DEFAULT E'PATITENT',
    "medic_id" UUID,
    "patient_id" UUID,
    "surveys_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "surveys_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_invited" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_id_key" ON "profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_medic_id_key" ON "profiles"("medic_id");

-- CreateIndex
CREATE UNIQUE INDEX "surveys_id_key" ON "surveys"("id");

-- CreateIndex
CREATE UNIQUE INDEX "questions_id_key" ON "questions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "answers_id_key" ON "answers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "surveys_notifications_id_key" ON "surveys_notifications"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_invited_AB_unique" ON "_invited"("A", "B");

-- CreateIndex
CREATE INDEX "_invited_B_index" ON "_invited"("B");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_medic_id_fkey" FOREIGN KEY ("medic_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys" ADD CONSTRAINT "surveys_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_surveysId_fkey" FOREIGN KEY ("surveysId") REFERENCES "surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys_notifications" ADD CONSTRAINT "surveys_notifications_medic_id_fkey" FOREIGN KEY ("medic_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys_notifications" ADD CONSTRAINT "surveys_notifications_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys_notifications" ADD CONSTRAINT "surveys_notifications_surveys_id_fkey" FOREIGN KEY ("surveys_id") REFERENCES "surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_invited" ADD CONSTRAINT "_invited_A_fkey" FOREIGN KEY ("A") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_invited" ADD CONSTRAINT "_invited_B_fkey" FOREIGN KEY ("B") REFERENCES "surveys"("id") ON DELETE CASCADE ON UPDATE CASCADE;
