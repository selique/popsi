-- CreateEnum
CREATE TYPE "roles" AS ENUM ('PATIENT', 'MEDIC');

-- CreateEnum
CREATE TYPE "answer_types" AS ENUM ('TEXT', 'BOOLEAN', 'MULTIPLE_CHOICE', 'SCALE');

-- CreateTable
CREATE TABLE "users" (
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "roles" DEFAULT E'PATIENT',
    "email" TEXT NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "surveys" (
    "idSurvey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("idSurvey")
);

-- CreateTable
CREATE TABLE "questions" (
    "idQuestion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questionDescription" TEXT,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("idQuestion")
);

-- CreateTable
CREATE TABLE "answers" (
    "idAnswer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "questionId" TEXT NOT NULL,
    "AnswerType" "answer_types" NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("idAnswer")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userId_key" ON "users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "surveys_idSurvey_key" ON "surveys"("idSurvey");

-- CreateIndex
CREATE UNIQUE INDEX "questions_idQuestion_key" ON "questions"("idQuestion");

-- CreateIndex
CREATE UNIQUE INDEX "answers_idAnswer_key" ON "answers"("idAnswer");

-- AddForeignKey
ALTER TABLE "surveys" ADD CONSTRAINT "surveys_idSurvey_fkey" FOREIGN KEY ("idSurvey") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_idQuestion_fkey" FOREIGN KEY ("idQuestion") REFERENCES "surveys"("idSurvey") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_idAnswer_fkey" FOREIGN KEY ("idAnswer") REFERENCES "questions"("idQuestion") ON DELETE RESTRICT ON UPDATE CASCADE;
