-- CreateEnum
CREATE TYPE "roles" AS ENUM ('PATIENT', 'MEDIC');

-- CreateEnum
CREATE TYPE "answer_types" AS ENUM ('TEXT', 'BOOLEAN', 'MULTIPLE_CHOICE', 'SCALE');

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
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surveys" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "profileId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" UUID NOT NULL,
    "question" TEXT NOT NULL,
    "alternatives" TEXT[],
    "type" "answer_types" NOT NULL DEFAULT E'TEXT',
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

-- CreateIndex
CREATE UNIQUE INDEX "profiles_id_key" ON "profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "surveys_id_key" ON "surveys"("id");

-- CreateIndex
CREATE UNIQUE INDEX "questions_id_key" ON "questions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "answers_id_key" ON "answers"("id");

-- AddForeignKey
ALTER TABLE "surveys" ADD CONSTRAINT "surveys_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_surveysId_fkey" FOREIGN KEY ("surveysId") REFERENCES "surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
