-- AlterTable
ALTER TABLE "drones" ALTER COLUMN "serial_number" SET DEFAULT gen_random_uuid();
