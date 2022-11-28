/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTokens" (
    "id" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizzCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "QuizzCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizzQuestion" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answerA" TEXT NOT NULL,
    "answerB" TEXT NOT NULL,
    "answerC" TEXT NOT NULL,
    "answerD" TEXT NOT NULL,
    "quizzCategoryId" TEXT NOT NULL,

    CONSTRAINT "QuizzQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_document_key" ON "user"("document");

-- CreateIndex
CREATE UNIQUE INDEX "UserTokens_id_key" ON "UserTokens"("id");

-- CreateIndex
CREATE UNIQUE INDEX "QuizzCategory_id_key" ON "QuizzCategory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "QuizzCategory_name_key" ON "QuizzCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "QuizzQuestion_id_key" ON "QuizzQuestion"("id");

-- AddForeignKey
ALTER TABLE "UserTokens" ADD CONSTRAINT "UserTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizzQuestion" ADD CONSTRAINT "QuizzQuestion_quizzCategoryId_fkey" FOREIGN KEY ("quizzCategoryId") REFERENCES "QuizzCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
