import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

interface JwtPayload {
    userId: number;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.sendStatus(403);

        const payload = decoded as JwtPayload;

        req.body.userId = payload.userId;

        next();
    });
};
