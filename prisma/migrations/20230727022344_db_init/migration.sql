-- CreateEnum
CREATE TYPE "DroneModel" AS ENUM ('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight');

-- CreateEnum
CREATE TYPE "DroneState" AS ENUM ('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING');

-- CreateTable
CREATE TABLE "drones" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "serial_number" VARCHAR(100) NOT NULL,
    "model" "DroneModel" NOT NULL,
    "battery_capacity" DECIMAL(65,30) NOT NULL,
    "state" "DroneState" NOT NULL DEFAULT 'IDLE',

    CONSTRAINT "drones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "weight_limit" DECIMAL(65,30) NOT NULL,
    "code" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "drone_id" UUID,

    CONSTRAINT "medications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "medications" ADD CONSTRAINT "medications_drone_id_fkey" FOREIGN KEY ("drone_id") REFERENCES "drones"("id") ON DELETE SET NULL ON UPDATE CASCADE;
