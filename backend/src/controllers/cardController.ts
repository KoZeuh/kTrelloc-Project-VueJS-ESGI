import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import * as fs from "node:fs";

const prisma = new PrismaClient();

export const updateTitle = async (req: Request, res: Response) => {
    const {cardId, title, userId } = req.body;

    if (!cardId) {
        return res.status(400).json({ message: 'Missing list ID' });
    }

    if (!title) {
        return res.status(400).json({ message: 'Missing title' });
    }

    try {
        const list = await prisma.card.update({
            where: {
                id: parseInt(cardId)
            },
            data: {
                title
            }
        });

        const actionType = (await prisma.actionType.findUnique({ where: { name: "UPDATE_TITLE" } }));

        if (!actionType) {
            return res.status(500).json({ message: 'An error occurred while updating the list' });
        }

        const actionTypeId = actionType.id;

        if (!actionTypeId) {
            return res.status(500).json({ message: 'An error occurred while updating the list' });
        }

        await prisma.cardAction.create({
            data: {
              actionTypeId: actionTypeId,
              parameters: { newTitle: title },
              cardId: cardId,
              userId: userId
            }
        });

        res.json(list);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the list' });
    }
}

export const updateDescription = async (req: Request, res: Response) => {
    const { cardId, description, userId } = req.body;

    if (!cardId) {
        return res.status(400).json({ message: 'Missing list ID' });
    }

    if (!description) {
        return res.status(400).json({ message: 'Missing description' });
    }

    try {
        const list = await prisma.card.update({
            where: {
                id: parseInt(cardId)
            },
            data: {
                description
            }
        });

        const actionType = (await prisma.actionType.findUnique({ where: { name: "UPDATE_DESCRIPTION" } }));

        if (!actionType) {
            return res.status(500).json({ message: 'An error occurred while updating description' });
        }

        const actionTypeId = actionType.id;

        if (!actionTypeId) {
            return res.status(500).json({ message: 'An error occurred while updating description' });
        }

        await prisma.cardAction.create({
            data: {
              actionTypeId: actionTypeId,
              parameters: {},
              cardId: cardId,
              userId: userId
            }
        });

        res.json(list);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the list' });
    }

}
const deleteCardCommon = async (cardId: number) => {
    const cardTags = await prisma.cardTag.findMany({
        where: {
            cardId: cardId
        }
    });

    const cardChecklists = await prisma.cardChecklist.findMany({
        where: {
            cardId: cardId
        }
    });

    const checklistItems = await prisma.cardChecklistItem.findMany({
        where: {
            checklistId: {
                in: cardChecklists.map(checklist => checklist.id)
            }
        }
    });

    const cardMembers = await prisma.cardMember.findMany({
        where: {
            cardId: cardId
        }
    });

    const cardAttachments = await prisma.cardAttachment.findMany({
        where: {
            cardId: cardId
        }
    });

    const cardActions = await prisma.cardAction.findMany({
        where: {
            cardId: cardId
        }
    });

    const cardTagIds = cardTags.map(cardTag => cardTag.id);
    const checklistItemIds = checklistItems.map(checklistItem => checklistItem.id);
    const checklistIds = cardChecklists.map(checklist => checklist.id);
    const cardMemberIds = cardMembers.map(cardMember => cardMember.id);
    const cardAttachmentIds = cardAttachments.map(cardAttachment => cardAttachment.id);
    const cardActionIds = cardActions.map(cardAction => cardAction.id);

    const deleteCardTags = prisma.cardTag.deleteMany({
        where: {
            id: {
                in: cardTagIds
            }
        }
    });

    const deleteCardChecklistItem = prisma.cardChecklistItem.deleteMany({
        where: {
            id: {
                in: checklistItemIds
            }
        }
    });

    const deleteCardChecklist = prisma.cardChecklist.deleteMany({
        where: {
            id: {
                in: checklistIds
            }
        }
    });

    const deleteCardMembers = prisma.cardMember.deleteMany({
        where: {
            id: {
                in: cardMemberIds
            }
        }
    });

    const deleteCardAttachments = prisma.cardAttachment.deleteMany({
        where: {
            id: {
                in: cardAttachmentIds
            }
        }
    });

    const deleteCard = prisma.card.delete({
        where: {
            id: cardId
        }
    });

    const deleteCardActions = prisma.cardAction.deleteMany({
        where: {
            id: {
                in: cardActionIds
            }
        }
    });

    await prisma.$transaction([deleteCardTags, deleteCardChecklistItem, deleteCardChecklist, deleteCardMembers, deleteCardAttachments, deleteCardActions, deleteCard]);

    return true;
};

export const deleteCard = async (req: Request, res: Response) => {
    const cardId = parseInt(req.params.cardId);

    if (!cardId) {
        return res.status(400).json({ message: 'Missing list ID' });
    }

    try {
        await deleteCardCommon(cardId);
        res.json({ message: 'List deleted' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the list' });
    }
};

export const deleteCardById = async (cardId: number) => {
    return await deleteCardCommon(cardId);
};


export const addChecklistToCardId = async (req: Request, res: Response) => {
    const { cardId, userId } = req.body;

    if (!cardId) {
        return res.status(400).json({ message: 'Missing card ID' });
    }

    try {
        const checklist = await prisma.cardChecklist.create({
            data: {
                cardId: parseInt(cardId),
                title: 'New Checklist',
                position: 1,
                addedById: userId
            }
        });

        const actionType = (await prisma.actionType.findUnique({ where: { name: "ADD_CHECKLIST" } }));

        if (!actionType) {
            return res.status(500).json({ message: 'An error occurred while adding the checklist' });
        }

        const actionTypeId = actionType.id;

        if (!actionTypeId) {
            return res.status(500).json({ message: 'An error occurred while adding the checklist' });
        }

        await prisma.cardAction.create({
            data: {
              actionTypeId: actionTypeId,
              parameters: { checklistName: checklist.title },
              cardId: cardId,
              userId: userId
            }
        });

        res.json(checklist);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the checklist' });
    }
}

export const addMemberToCard = async (req: Request, res: Response) => {
    const {cardId, memberId, userId} = req.body;

    if (!cardId) {
        return res.status(400).json({ message: 'Missing card ID' });
    }

    if (!memberId) {
        return res.status(400).json({ message: 'Missing member ID' });
    }

    try {
        const cardMember = await prisma.cardMember.create({
            data: {
                cardId,
                userId: memberId,
                addedById: userId
            },
            include: {
                user: true
            }
        });

        const actionType = (await prisma.actionType.findUnique({ where: { name: "ADD_MEMBER" } }));

        if (!actionType) {
            return res.status(500).json({ message: 'An error occurred while adding new member' });
        }

        const actionTypeId = actionType.id;

        if (!actionTypeId) {
            return res.status(500).json({ message: 'An error occurred while adding new member' });
        }

        await prisma.cardAction.create({
            data: {
              actionTypeId: actionTypeId,
              parameters: { memberName: cardMember.user.username },
              cardId: cardId,
              userId: userId
            }
        });

        res.json(cardMember);
    } catch (error) {
        res.status(500).json({ message: "This user is already a member of this card" });
    }
}

export const removeCardMemberById = async (req: Request, res: Response) => {
    const memberId = parseInt(req.params.memberId);
    const userId = req.body.userId;

    if (!memberId) {
        return res.status(400).json({ message: 'Missing member ID' });
    }

    try {
        const cardMember = await prisma.cardMember.delete({
            where: {
                id: memberId
            },
            include: {
                user: true
            }
        });

        const actionType = (await prisma.actionType.findUnique({ where: { name: "REMOVE_MEMBER" } }));

        if (!actionType) {
            return res.status(500).json({ message: 'An error occurred while removing the member from the card' });
        }

        const actionTypeId = actionType.id;

        if (!actionTypeId) {
            return res.status(500).json({ message: 'An error occurred while removing the member from the card' });
        }

        await prisma.cardAction.create({
            data: {
              actionTypeId: actionTypeId,
              parameters: { memberName: cardMember.user.username },
              cardId: cardMember.cardId,
              userId: userId
            }
        });

        res.json({ message: 'Member removed from card' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while removing the member from the card' });
    }
}

export const getAttachmentsByCardId = async (req: Request, res: Response) => {
    const { cardId } = req.params;

    try {
        const attachments = await prisma.cardAttachment.findMany({
            where: { cardId: parseInt(cardId) },
        });
        res.json(attachments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get attachments' });
    }
}

export const addAttachmentToCardId = async (req: Request, res: Response) => {
    const { cardId } = req.params;

    // @ts-ignore
    const { file } = req;

    const userId = 1; // TODO: A corriger

    const extension = path.extname(file.originalname);
    const newFileName = `${file.filename}${extension}`;
    const newPath = path.join(file.destination, newFileName);

    fs.renameSync(file.path, newPath);

    const fileSuffix = path.basename(newPath);

    try {
        const attachment = await prisma.cardAttachment.create({
            data: {
                url: fileSuffix,
                type: file.mimetype,
                cardId: parseInt(cardId),
                addedById: userId,
            },
        });

        const actionType = (await prisma.actionType.findUnique({ where: { name: "ADD_ATTACHMENT" } }));

        if (!actionType) {
            return res.status(500).json({ message: 'An error occurred while adding the attachment' });
        }

        const actionTypeId = actionType.id;

        if (!actionTypeId) {
            return res.status(500).json({ message: 'An error occurred while adding the attachment' });
        }

        await prisma.cardAction.create({
            data: {
              actionTypeId: actionTypeId,
              parameters: { attachmentName: file.originalname },
              cardId: attachment.cardId,
              userId: userId
            }
        });

        res.json(attachment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add attachment' });
    }
}

export const deleteAttachmentById = async (req: Request, res: Response) => {
    const { attachmentId } = req.params;
    const userId = req.body.userId;

    try {
        const cardAttachment = await prisma.cardAttachment.delete({
            where: { id: parseInt(attachmentId) },
        });

        const filePath = path.join('uploads', cardAttachment.url);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Failed to delete attachment' });
            }
        });

        const actionType = (await prisma.actionType.findUnique({ where: { name: "REMOVE_ATTACHMENT" } }));

        if (!actionType) {
            return res.status(500).json({ message: 'An error occurred while deleting the attachment' });
        }

        const actionTypeId = actionType.id;

        if (!actionTypeId) {
            return res.status(500).json({ message: 'An error occurred while deleting the attachment' });
        }

        await prisma.cardAction.create({
            data: {
              actionTypeId: actionTypeId,
              parameters: { attachmentName: cardAttachment.url },
              cardId: cardAttachment.cardId,
              userId: userId
            }
        });
        
        res.json({ message: 'Attachment deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete attachment' });
    }
}

export const archiveCardById = async (req: Request, res: Response) => {
    const { cardId } = req.params;
    const userId = req.body.userId;

    try {
        const card = await prisma.card.update({
            where: { id: parseInt(cardId) },
            data: { archived: true },
        });

        const actionType = (await prisma.actionType.findUnique({ where: { name: "ARCHIVE_CARD" } }));

        if (!actionType) {
            return res.status(500).json({ message: 'An error occurred while archiving the card' });
        }

        const actionTypeId = actionType.id;

        if (!actionTypeId) {
            return res.status(500).json({ message: 'An error occurred while archiving the card' });
        }

        await prisma.cardAction.create({
            data: {
              actionTypeId: actionTypeId,
              parameters: {},
              cardId: card.id,
              userId: userId
            }
        });

        res.json(card);
    } catch (error) {
        res.status(500).json({ message: 'Failed to archive card' });
    }
}

export const updateCardDeadlineById = async (req: Request, res: Response) => {
    const { cardId, userId } = req.body;
    let { startDate, endDate } = req.body;

    if (!cardId) {
        return res.status(400).json({ message: 'Missing card ID' });
    }

    console.log(cardId, startDate, endDate);

    try {
        const card = await prisma.card.update({
            where: { id: parseInt(cardId) },
            data: { startDate, endDate },
        });


        res.json(card);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update deadline' });
    }
}

export const duplicateCardById = async (req: Request, res: Response) => {
    const { cardId } = req.params;
    const userId = req.body.userId;

    if (!cardId) {
        return res.status(400).json({ message: 'Missing card ID' });
    }

    try {
        const card = await prisma.card.findUnique({
            where: { id: parseInt(cardId) },
            include: {
                tags: true,
                checklists: {
                    include: {
                        items: true
                    }
                },
                members: true,
                attachments: true
            }
        });

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        const newCard = await prisma.card.create({
            data: {
                title: card.title,
                description: card.description,
                position: card.position,
                listId: card.listId,
                startDate: card.startDate,
                endDate: card.endDate,
                archived: card.archived,
                userId: userId
            }
        });

        const cardTags = card.tags.map(tag => {
            return {
                tagId: tag.tagId,
                addedById: tag.addedById,
                cardId: newCard.id
            }
        });

        const cardMembers = card.members.map(member => {
            return {
                userId: member.userId,
                addedById: member.addedById,
                cardId: newCard.id
            }
        });

        const cardChecklists = card.checklists.map(checklist => {
            return {
                title: checklist.title,
                position: checklist.position,
                addedById: checklist.addedById,
                cardId: newCard.id
            }
        });

        await prisma.cardTag.createMany({
            data: cardTags
        });

        await prisma.cardMember.createMany({
            data: cardMembers
        });

        await prisma.cardChecklist.createMany({
            data: cardChecklists
        });

        res.json(newCard);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to duplicate card' });
    }
}