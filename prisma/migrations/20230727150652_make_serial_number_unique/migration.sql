/*
  Warnings:

  - A unique constraint covering the columns `[serial_number]` on the table `drones` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "drones_serial_number_key" ON "drones"("serial_number");
