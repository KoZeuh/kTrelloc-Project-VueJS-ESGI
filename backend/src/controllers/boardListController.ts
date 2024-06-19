import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { randomInt } from "node:crypto";
import { deleteCardById } from './cardController';

const prisma = new PrismaClient();

export const createCardToListId = async (req: Request, res: Response) => {
    const { listId } = req.body;
    const userId = req.body.userId;

    if (!listId) {
        return res.status(400).json({ message: 'Missing list ID' });
    }

    if (!userId) {
        return res.status(400).json({ message: 'Missing user ID' });
    }

    try {
        const card = await prisma.card.create({
            data: {
                title: "New Card",
                description: 'New Description',
                listId: parseInt(listId),
                userId: userId,
                position: randomInt(1, 100)
            }
        });

        const cardData = await prisma.card.findUnique({
            where: {
                id: card.id
            },
            include: {
                checklists: {
                    include: {
                        items: {
                            orderBy: {
                                position: 'asc'
                            }
                        }
                    },
                    orderBy: {
                        position: 'asc'
                    }
                },
                tags: {
                    include: {
                        tag: true
                    }
                },
                members: {
                    include: {
                        user: true
                    }
                },
                attachments: true
            }
        });

        res.json(cardData);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the card' });
    }
}

export const updateTitle = async (req: Request, res: Response) => {
    const {listId, title } = req.body;

    if (!listId) {
        return res.status(400).json({ message: 'Missing list ID' });
    }

    if (!title) {
        return res.status(400).json({ message: 'Missing title' });
    }

    try {
        const list = await prisma.boardList.update({
            where: {
                id: parseInt(listId)
            },
            data: {
                title: title
            }
        });

        res.json(list);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the list' });
    }
}

export const deleteList = async (req: Request, res: Response) => {
    const listId = req.params.listId;

    if (!listId) {
        return res.status(400).json({ message: 'Missing list ID' });
    }

    try {
        const cards = await prisma.card.findMany({
            where: {
                listId: parseInt(listId)
            }
        });

        const cardIds = cards.map(card => card.id);

        for (const cardId of cardIds) {
            await deleteCardById(cardId);
        }

        await prisma.boardList.delete({
            where: {
                id: parseInt(listId)
            }
        });

        res.json({ message: 'List deleted' });
    } catch (error) {
        res.status(500).json({message: 'An error occurred while deleting the list' });
    }
}

export const duplicateListById = async (req: Request, res: Response) => {
    const listId = req.params.listId;

    if (!listId) {
        return res.status(400).json({ message: 'Missing list ID' });
    }

    try {
        const list = await prisma.boardList.findUnique({
            where: {
                id: parseInt(listId)
            },
            include: {
                cards: {
                    include: {
                        checklists: {
                            include: {
                                items: {
                                    orderBy: {
                                        position: 'asc'
                                    }
                                }
                            },
                            orderBy: {
                                position: 'asc'
                            }
                        },
                        tags: {
                            include: {
                                tag: true
                            }
                        },
                        members: {
                            include: {
                                user: true
                            }
                        },
                    },
                    orderBy: {
                        position: 'asc'
                    }
                }
            }
        });

        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }

        const newList = await prisma.boardList.create({
            data: {
                title: list.title,
                position: randomInt(1, 100),
                boardId: list.boardId
            }
        });

        for (const card of list.cards) {
            const newCard = await prisma.card.create({
                data: {
                    title: card.title,
                    description: card.description,
                    position: card.position,
                    listId: newList.id,
                    startDate: card.startDate,
                    endDate: card.endDate,
                    archived: card.archived,
                    userId: card.userId
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
        }

        res.json(newList);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while duplicating the list' });
    }
}