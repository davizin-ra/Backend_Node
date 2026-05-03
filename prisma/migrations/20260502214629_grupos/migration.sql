-- AlterTable
ALTER TABLE `users` ADD COLUMN `gruposId` INTEGER NULL;

-- CreateTable
CREATE TABLE `grupos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_gruposId_fkey` FOREIGN KEY (`gruposId`) REFERENCES `grupos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
