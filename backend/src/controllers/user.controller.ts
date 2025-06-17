import {Request, Response} from 'express';
import * as UserService from '../services/user.service';
export async function getUser(req: Request, res: Response): Promise<void> {
    try{
        const {id} = req.params;
        if (!id) {
            res.status(400).json({message: 'User ID is required'});
            return;
        }
        const user = await UserService.getUser(Number(id));
        if (!user) {
            res.status(404).json({message: 'User not found'});
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

export async function updateUser(req: Request, res: Response): Promise<void> {
    try {
        const {id} = req.params;
        const {name, email} = req.body;

        if (!id || !name || !email) {
            res.status(400).json({message: 'ID, name, and email are required'});
            return;
        }

        const updatedUser = await UserService.updateUser(req, res);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
    try {
        const {id} = req.params;

        if (!id) {
            res.status(400).json({message: 'User ID is required'});
            return;
        }

        await UserService.deleteUser(req, res);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}