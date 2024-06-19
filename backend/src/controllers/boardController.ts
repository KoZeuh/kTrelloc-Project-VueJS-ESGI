import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { randomInt } from "node:crypto";
import { deleteCardById } from "./cardController";

const prisma = new PrismaClient();

export const getBoardContentById = async (req: Request, res: Response) => {
    const boardId = req.params.boardId;
    const userId = req.body.userId;

    if (!boardId) {
        return res.status(400).json({ message: 'Missing board ID' });
    }

    try {
        const board = await prisma.board.findUnique({
            where: {
                id: parseInt(boardId, 10)
            },
            include: {
                members: {
                    include: {
                        user: true
                    }
                },
                lists: {
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
                                attachments: true,
                                actions: {
                                    include: {
                                        actionType: true,
                                        user: true
                                    },
                                    orderBy: {
                                        createdAt: 'desc'
                                    }
                                }
                            }
                        }
                    },
                    orderBy: {
                        id: 'asc'
                    }
                }
            }
        });

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        let boardWithRole;

        if (board.userId == userId) {
            boardWithRole = {
                ...board,
                role: 'owner'
            };
        } else {
            const boardMember = await prisma.boardMember.findFirst({
                where: {
                    boardId: parseInt(boardId),
                    userId: userId
                }
            });

            if (!boardMember) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            boardWithRole = {
                ...board,
                role: boardMember.role
            };
        }

        res.json(boardWithRole);
    } catch (error) {
        res.status(500).json({ message: 'This board does not exist' });
    }
};

export const getBoardsByUser = async (req: Request, res: Response) => {
    const userId = req.body.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const boardMembers = await prisma.boardMember.findMany({
            where: {
                userId: userId
            },
            include: {
                board: {
                    include: {
                        members: {
                            include: {
                                user: true
                            }
                        },
                        lists: {
                            include: {
                                cards: {
                                    include: {
                                        checklists: {
                                            include: {
                                                items: true
                                            }
                                        },
                                        tags: true
                                    }
                                }
                            },
                            orderBy: {
                                position: 'asc'
                            }
                        }
                    }
                }
            }
        });

        const ownerBoards = await prisma.board.findMany({
            where: {
                userId: userId
            },
            include: {
                members: {
                    include: {
                        user: true
                    }
                },
                lists: {
                    include: {
                        cards: {
                            include: {
                                checklists: true,
                                tags: true
                            }
                        },
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const boardsWithRoles = boardMembers.map(boardMember => ({
            ...boardMember.board,
            role: boardMember.role
        }));

        ownerBoards.forEach(board => {
            if (!boardsWithRoles.some(b => b.id === board.id)) {
                boardsWithRoles.push({
                    ...board,
                    role: 'owner'
                });
            }
        });

        res.json(boardsWithRoles);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const createBoard = async (req: Request, res: Response) => {
    const { title, description, visibility } = req.body;
    const userId = req.body.userId;

    if (!title || !visibility || !userId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate visibility
    const validVisibilities = ['PUBLIC', 'PRIVATE', 'PRIVATE_INVITATION_ONLY'];
    if (!validVisibilities.includes(visibility)) {
        return res.status(400).json({ message: 'Invalid visibility value' });
    }

    try {
        const newBoard = await prisma.board.create({
            data: {
                title,
                description,
                visibility,
                userId,
            }
        });

        res.json(newBoard);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the board' });
    }
}
export const updateBoard = async (req: Request, res: Response) => {
    const { id, title, description, visibility } = req.body;

    if (!id || !title || !visibility) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate visibility
    const validVisibilities = ['PUBLIC', 'PRIVATE', 'PRIVATE_INVITATION_ONLY'];
    if (!validVisibilities.includes(visibility)) {
        return res.status(400).json({ message: 'Invalid visibility value' });
    }

    try {
        const updatedBoard = await prisma.board.update({
            where: {
                id: id
            },
            data: {
                title,
                description,
                visibility
            }
        });

        res.json({ message: 'Board updated', board: updatedBoard });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the board' });
    }
}

export const deleteBoard = async (req: Request, res: Response) => {
    const boardId = req.params.boardId;

    try {
        const userIsOwnerOfBoard = await prisma.board.findFirst({
            where: {
                id: parseInt(boardId),
                userId: req.body.userId
            }
        });

        if (!userIsOwnerOfBoard) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await prisma.boardMember.deleteMany({
            where: {
                boardId: parseInt(boardId)
            }
        });

        const lists = await prisma.boardList.findMany({
            where: {
                boardId: parseInt(boardId)
            },
            select: {
                id: true
            }
        });

        const listIds = lists.map(list => list.id);

        const cards = await prisma.card.findMany({
            where: {
                listId: {
                    in: listIds
                }
            },
            select: {
                id: true
            }
        });

        const cardIds = cards.map(card => card.id);

        for (const cardId of cardIds) {
            await deleteCardById(cardId);
        }

        await prisma.boardList.deleteMany({
            where: {
                id: {
                    in: listIds
                }
            }
        });

        await prisma.board.delete({
            where: {
                id: parseInt(boardId)
            }
        });

        res.json({ message: 'Board deleted' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the board' });
    }
};

export const createListByBoardId = async (req: Request, res: Response) => {
    const { boardId } = req.body;

    if (!boardId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const newBoardList = await prisma.boardList.create({
            data: {
                title: "New List",
                position: randomInt(1, 100),
                boardId: parseInt(boardId)
            }
        });

        res.json(newBoardList);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the list' });
    }
}

export const addMemberToBoard = async (req: Request, res: Response) => {
    const addedByUserId = req.body.userId;
    const { boardId, emailOrUsername, role } = req.body;

    if (!boardId || !emailOrUsername) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const board = await prisma.board.findUnique({
            where: {
                id: parseInt(boardId)
            }
        });

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: emailOrUsername },
                    { username: emailOrUsername }
                ]
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const boardMember = await prisma.boardMember.create({
            data: {
                boardId: parseInt(boardId),
                userId: user.id,
                role,
                addedById: addedByUserId
            }
        });

        res.json(boardMember);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while adding the member to the board' });
    }
}

export const removeMemberFromBoard = async (req: Request, res: Response) => {
    const boardId = req.params.boardId;
    const userId = req.params.userId;

    if (!boardId || !userId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const board = await prisma.board.findUnique({
            where: {
                id: parseInt(boardId)
            }
        });

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        const boardMember = await prisma.boardMember.findFirst({
            where: {
                boardId: parseInt(boardId),
                userId: parseInt(userId)
            }
        });

        if (!boardMember) {
            return res.status(404).json({ message: 'User is not a member of this board' });
        }

        await prisma.boardMember.delete({
            where: {
                id: boardMember.id
            }
        });

        res.json({ message: 'User removed from board' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while removing the member from the board' });
    }
}