/*
  Warnings:

  - You are about to alter the column `battery_capacity` on the `drones` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "drones" ALTER COLUMN "battery_capacity" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "medications" ALTER COLUMN "weight" SET DATA TYPE DECIMAL;
