import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

import * as yup from 'yup';

const registerSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
});

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        await registerSchema.validate({ username, email, password });

        const { token, user } = await registerUser(username, email, password);
        res.json({ token, user });
    } catch (error) {
        res.status(400).json({ message: "Validation failed" });
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
