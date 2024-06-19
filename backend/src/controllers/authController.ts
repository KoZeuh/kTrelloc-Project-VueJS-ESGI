import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const { token, user } = await registerUser(username, email, password);
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Your email/username already exists" });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const { token, user } = await loginUser(email, password);
        res.json({ token, user });
    } catch (error: any) {
        res.status(500).json({ message: "Invalid email or password" });
    }
};
