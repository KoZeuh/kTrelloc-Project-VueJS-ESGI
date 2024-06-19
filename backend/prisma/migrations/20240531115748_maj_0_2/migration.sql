/*
  Warnings:

  - Added the required column `addedById` to the `BoardMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addedById` to the `CardAttachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addedById` to the `CardChecklist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addedById` to the `CardChecklistItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addedById` to the `CardMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addedById` to the `CardTag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `boardmember` ADD COLUMN `addedById` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `cardattachment` ADD COLUMN `addedById` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `cardchecklist` ADD COLUMN `addedById` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `cardchecklistitem` ADD COLUMN `addedById` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `cardmember` ADD COLUMN `addedById` INTEGER NOT NULL,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `cardtag` ADD COLUMN `addedById` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `BoardMember` ADD CONSTRAINT `BoardMember_addedById_fkey` FOREIGN KEY (`addedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardMember` ADD CONSTRAINT `CardMember_addedById_fkey` FOREIGN KEY (`addedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardTag` ADD CONSTRAINT `CardTag_addedById_fkey` FOREIGN KEY (`addedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardChecklist` ADD CONSTRAINT `CardChecklist_addedById_fkey` FOREIGN KEY (`addedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardChecklistItem` ADD CONSTRAINT `CardChecklistItem_addedById_fkey` FOREIGN KEY (`addedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CardAttachment` ADD CONSTRAINT `CardAttachment_addedById_fkey` FOREIGN KEY (`addedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
