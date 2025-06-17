import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUser(id: number) {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            return null;
        }
        return user;
    } catch (err) {
        console.error('Error in getUser controller', err);
        const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred';
        throw new Error(errorMessage);
    }
}

export async function updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { name, email },
        });
        res.status(200).json(user);
    } catch (err) {
        console.error('Error in updateUser controller', err);
        res.status(500).json({ error: 'Failed to update user' });
    }
}

export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
        await prisma.user.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    } catch (err) {
        console.error('Error in deleteUser controller', err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
}
