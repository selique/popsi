-- AlterTable
ALTER TABLE "answers" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "questions" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "surveys" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "surveys_notifications" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
