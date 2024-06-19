import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

export const registerUser = async (username: string, email: string, password: string) => {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    });

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
        expiresIn: '1h',
    });

    return { token, user };
};

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
        expiresIn: '1h',
    });

    return { token, user };
};
