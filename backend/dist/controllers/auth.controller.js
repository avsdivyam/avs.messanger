"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.login = login;
exports.logout = logout;
exports.changePassword = changePassword;
exports.resetPassword = resetPassword;
const AuthService = __importStar(require("../services/auth.service"));
async function signup(req, res) {
    try {
        const { name, email, password } = req.body;
        // Input validation
        if (!name || !email || !password) {
            res.status(400).json({ message: 'Name, email, and password are required' });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({ message: 'Password must be at least 6 characters long' });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ message: 'Please provide a valid email address' });
            return;
        }
        const user = await AuthService.signup(name, email, password);
        res.status(201).json({
            message: 'User registered successfully',
            user: user.user
        });
    }
    catch (err) {
        console.log('Error in auth controller', err);
        const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred';
        res.status(400).json({ message: errorMessage });
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await AuthService.login(email, password);
        res.status(200).json({
            message: 'User logged in successfully',
            user: user.user,
            token: user.token
        });
    }
    catch (err) {
        console.log('Error in auth controller', err);
        const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred';
        res.status(400).send({ message: errorMessage });
    }
}
async function logout(req, res) {
    try {
        await AuthService.logout(req.user.id);
        res.status(200).json({ message: 'User logged out successfully' });
    }
    catch (err) {
        console.log('Error in auth controller', err);
        const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred';
        res.status(400).send({ message: errorMessage });
    }
}
async function changePassword(req, res) {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            res.status(400).json({ message: 'Current password and new password are required' });
            return;
        }
        if (newPassword.length < 6) {
            res.status(400).json({ message: 'New password must be at least 6 characters long' });
            return;
        }
        await AuthService.changePassword(req.user.id, currentPassword, newPassword);
        res.status(200).json({ message: 'Password changed successfully' });
    }
    catch (err) {
        console.log('Error in auth controller', err);
        const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred';
        res.status(400).send({ message: errorMessage });
    }
}
async function resetPassword(req, res) {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ message: 'Email is required' });
            return;
        }
        await AuthService.resetPassword(email);
        res.status(200).json({ message: 'Password reset email sent successfully' });
    }
    catch (err) {
        console.log('Error in auth controller', err);
        const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred';
        res.status(400).send({ message: errorMessage });
    }
}
