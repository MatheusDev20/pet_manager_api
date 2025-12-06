-- CreateTable
CREATE TABLE `Log` (
    `id` CHAR(36) NOT NULL,
    `userId` CHAR(36) NULL,
    `method` VARCHAR(10) NOT NULL,
    `route` VARCHAR(255) NOT NULL,
    `status` INTEGER NOT NULL,
    `timestamp` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `params` JSON NULL,
    `query` JSON NULL,
    `body` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
