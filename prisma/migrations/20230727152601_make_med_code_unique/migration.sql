/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `medications` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "medications_code_key" ON "medications"("code");
