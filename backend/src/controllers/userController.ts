import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserProfile = async (req: Request, res: Response) => {
    const userId = req.body.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateUserEmail = async (req: Request, res: Response) => {
    const userId = req.body.userId;
    const userEmail = req.body.email;

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { email: userEmail },
        });

        res.json({ user:user, message: 'Email updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};