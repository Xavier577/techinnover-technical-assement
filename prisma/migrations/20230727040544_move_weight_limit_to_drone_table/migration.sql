/*
  Warnings:

  - You are about to drop the column `weight_limit` on the `medications` table. All the data in the column will be lost.
  - You are about to alter the column `weight` on the `medications` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Decimal(65,30)`.
  - Added the required column `weight_limit` to the `drones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "drones" ADD COLUMN     "weight_limit" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "medications" DROP COLUMN "weight_limit",
ALTER COLUMN "weight" SET DATA TYPE DECIMAL(65,30);
