import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addChecklistItem = async (req: Request, res: Response) => {
    const addedByUserId = req.body.userId;
    const { checklistId } = req.body;

    if (!checklistId) {
        return res.status(400).json({ message: 'Missing checklist ID' });
    }

    try {
        const checklistItem = await prisma.cardChecklistItem.create({
            data: {
                checklistId: parseInt(checklistId),
                title: 'New item',
                completed: false,
                position: 1,
                addedById: addedByUserId
            }
        });

        res.json(checklistItem);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the checklist item' });
    }
}

export const updateTitle = async (req: Request, res: Response) => {
    const { checklistId, title } = req.body;

    if (!checklistId) {
        return res.status(400).json({ message: 'Missing checklist ID' });
    }

    if (!title) {
        return res.status(400).json({ message: 'Missing title' });
    }

    try {
        const checklist = await prisma.cardChecklist.update({
            where: {
                id: parseInt(checklistId)
            },
            data: {
                title
            }
        });

        res.json(checklist);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the checklist' });
    }
}

export const deleteChecklist = async (req: Request, res: Response) => {
    const checklistId = req.params.checklistId;
    const userId = req.body.userId;

    if (!checklistId) {
        return res.status(400).json({ message: 'Missing checklist ID' });
    }

    try {
        const checklistItems = await prisma.cardChecklistItem.findMany({
            where: {
                checklistId: parseInt(checklistId)
            }
        });

        const checklistItemIds = checklistItems.map(item => item.id);

        await prisma.cardChecklistItem.deleteMany({
            where: {
                id: {
                    in: checklistItemIds
                }
            }
        });

        const oldChecklist = await prisma.cardChecklist.delete({
            where: {
                id: parseInt(checklistId)
            }
        });

        const actionType = (await prisma.actionType.findUnique({ where: { name: "REMOVE_CHECKLIST" } }));

        if (!actionType) {
            return res.status(500).json({ message: 'An error occurred while deleting the checklist' });
        }

        const actionTypeId = actionType.id;

        if (!actionTypeId) {
            return res.status(500).json({ message: 'An error occurred while deleting the checklist' });
        }

        await prisma.cardAction.create({
            data: {
              actionTypeId: actionTypeId,
              parameters: { checklistName: oldChecklist.title },
              cardId: oldChecklist.cardId,
              userId: userId
            }
        });

        res.json({ message: 'Checklist deleted' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the checklist' });
    }
}

export const deleteChecklistItem = async (req: Request, res: Response) => {
    const itemId = req.params.itemId;

    if (!itemId) {
        return res.status(400).json({ message: 'Missing item ID' });
    }

    try {
        await prisma.cardChecklistItem.delete({
            where: {
                id: parseInt(itemId)
            }
        });

        res.json({ message: 'Checklist item deleted' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the checklist item' });
    }
}

export const updateStateCheckListItemById = async (req: Request, res: Response) => {
    const { itemId, state } = req.body;

    if (!itemId) {
        return res.status(400).json({ message: 'Missing item ID' });
    }

    if (state === undefined) {
        return res.status(400).json({ message: 'Missing state' });
    }

    try {
        const checklistItem = await prisma.cardChecklistItem.update({
            where: {
                id: parseInt(itemId)
            },
            data: {
                completed: state
            }
        });

        res.json(checklistItem);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the checklist item' });
    }
}