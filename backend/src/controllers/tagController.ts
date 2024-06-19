import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTags = async (req: Request, res: Response) => {
    try {
        const tags = await prisma.tag.findMany();

        res.json(tags);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching tags' });
    }
}

export const addTagToCardId = async (req: Request, res: Response) => {
    const { cardId, tagId, userId } = req.body;

    if (!cardId) {
        return res.status(400).json({ message: 'Missing card ID' });
    }

    if (!tagId) {
        return res.status(400).json({ message: 'Missing tag ID' });
    }

    try {
        const cardTag = await prisma.cardTag.create({
            data: {
                cardId: parseInt(cardId),
                tagId: parseInt(tagId),
                addedById: userId
            }
        });

        const cardTagData = await prisma.cardTag.findUnique({
            where: {
                id: cardTag.id
            },
            include: {
                tag: true
            }
        });

        const actionType = (await prisma.actionType.findUnique({ where: { name: "ADD_TAG" } }));

        if (!actionType) {
            return res.status(500).json({ message: 'An error occurred while adding tag to card' });
        }

        const actionTypeId = actionType.id;

        if (!actionTypeId) {
            return res.status(500).json({ message: 'An error occurred while adding tag to card' });
        }

        await prisma.cardAction.create({
            data: {
              actionTypeId: actionTypeId,
              parameters: { tagName: cardTagData?.tag.name },
              cardId: cardTag.cardId,
              userId: userId
            }
        });

        res.json(cardTagData);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while adding tag to card' });
    }
}

export const deleteTagById = async (req: Request, res: Response) => {
    const tagId = req.params.tagId;
    const userId = req.body.userId;

    if (!tagId) {
        return res.status(400).json({ message: 'Missing tag ID' });
    }

    try {
        const oldTag = await prisma.cardTag.delete({
            where: {
                id: parseInt(tagId)
            },
            include: {
                tag: true
            }
        });

        const actionType = (await prisma.actionType.findUnique({ where: { name: "REMOVE_TAG" } }));

        if (!actionType) {
            return res.status(500).json({ message: 'An error occurred while deleting tag from card' });
        }

        const actionTypeId = actionType.id;

        if (!actionTypeId) {
            return res.status(500).json({ message: 'An error occurred while deleting tag from card' });
        }

        await prisma.cardAction.create({
            data: {
              actionTypeId: actionTypeId,
              parameters: { tagName: oldTag.tag.name },
              cardId: oldTag.cardId,
              userId: userId
            }
        });

        res.json({ message: 'Tag deleted from card' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting tag from card' });
    }
}