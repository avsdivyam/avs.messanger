import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticate(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!authHeader || !token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            res.status(500).json({ message: 'JWT secret is not configured' });
            return;
        }
        const decoded = jwt.verify(token as string, secret);
        (req as any).user = decoded;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
}