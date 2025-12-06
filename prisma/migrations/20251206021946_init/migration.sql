/*
  Warnings:

  - You are about to drop the column `reason` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `service` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Appointment` DROP COLUMN `reason`,
    ADD COLUMN `service` VARCHAR(40) NOT NULL;
