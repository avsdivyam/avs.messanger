import {Request, Response} from 'express';
import * as AuthService from '../services/auth.service';

export async function signup(req: Request, res: Response): Promise<void> {
    try{
        const {name, email, password} = req.body;
        
        // Input validation
        if (!name || !email || !password) {
            res.status(400).json({message: 'Name, email, and password are required'});
            return;
        }
        
        if (password.length < 6) {
            res.status(400).json({message: 'Password must be at least 6 characters long'});
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({message: 'Please provide a valid email address'});
            return;
        }
        
        const user = await AuthService.signup(name, email, password);
        res.status(201).json({
            message: 'User registered successfully',
            user: user.user
        });
    }catch(err){
        console.log('Error in auth controller', err);
        const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred';
        res.status(400).json({message: errorMessage});
    }
}

export async function login(req: Request, res: Response): Promise<void> {
    try{
        const {email, password} = req.body;
        const user = await AuthService.login(email, password);
        res.status(200).json({
            message: 'User logged in successfully',
            user: user.user,
            token: user.token
        });
    }catch(err){
        console.log('Error in auth controller', err);
        const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred';
        res.status(400).send({message: errorMessage});
    }
}   

export async function logout(req: Request, res: Response): Promise<void> {
    try{
        await AuthService.logout(req.user.id);
        res.status(200).json({message: 'User logged out successfully'});
    }catch(err){
        console.log('Error in auth controller', err);
        const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred';
        res.status(400).send({message: errorMessage});
    }
}

export async function changePassword(req: Request, res: Response): Promise<void> {
    try{
        const {currentPassword, newPassword} = req.body;
        if (!currentPassword || !newPassword) {
            res.status(400).json({message: 'Current password and new password are required'});
            return;
        }
        if (newPassword.length < 6) {
            res.status(400).json({message: 'New password must be at least 6 characters long'});
            return;
        }
        await AuthService.changePassword(req.user.id, currentPassword, newPassword);
        res.status(200).json({message: 'Password changed successfully'});
    }catch(err){
        console.log('Error in auth controller', err);
        const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred';
        res.status(400).send({message: errorMessage});
    }
}

export async function resetPassword(req: Request, res: Response): Promise<void> {
    try{
        const {email} = req.body;
        if (!email) {
            res.status(400).json({message: 'Email is required'});
            return;
        }
        await AuthService.resetPassword(email);
        res.status(200).json({message: 'Password reset email sent successfully'});
    }catch(err){
        console.log('Error in auth controller', err);
        const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred';
        res.status(400).send({message: errorMessage});
    }
}