-- CreateTable
CREATE TABLE `Appointment` (
    `id` CHAR(36) NOT NULL,
    `petId` CHAR(36) NOT NULL,
    `date` TIMESTAMP(6) NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `notes` TEXT NOT NULL,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,

    INDEX `idx_petId`(`petId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `Pet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
