/*
  Warnings:

  - You are about to drop the column `dueDate` on the `card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `card` DROP COLUMN `dueDate`,
    ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `startDate` DATETIME(3) NULL;


INSERT INTO Tag (name, color) VALUES ('Important', 'red');
INSERT INTO Tag (name, color) VALUES ('To Do', 'orange');
INSERT INTO Tag (name, color) VALUES ('In Progress', 'blue');
INSERT INTO Tag (name, color) VALUES ('Done', 'green');

INSERT INTO `actiontype` (`id`, `name`, `description`) VALUES
(1, 'ADD_CHECKLIST', 'Checklist {checklistName} added to the card'),
(2, 'ADD_ATTACHMENT', 'Attachment {attachmentName} added to the card'),
(3, 'ADD_MEMBER', 'Member {memberName} added to the card'),
(4, 'ADD_TAG', 'Tag {tagName} added to the card'),
(5, 'ARCHIVE_CARD', 'Card archived'),
(6, 'UPDATE_TITLE', 'Card title {oldTitle} updated to {newTitle}'),
(7, 'UPDATE_DESCRIPTION', 'Card description updated'),
(8, 'REMOVE_TAG', 'Tag {tagName} removed from the card'),
(9, 'REMOVE_MEMBER', 'Member {memberName} removed from the card'),
(10, 'REMOVE_ATTACHMENT', 'Attachment {attachmentName} removed from the card'),
(11, 'REMOVE_CHECKLIST', 'Checklist {checklistName} removed from the card');