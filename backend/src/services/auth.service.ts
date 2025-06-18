import bcrypt from 'bcrypt';
import {PrismaClient} from '@prisma/client';
import {generateToken} from '../utils/jwt';

const prisma = new PrismaClient();

export async function signup(name: string, email: string, password: string) {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            passowrd: hashedPassword,
        }
    });

    const token = generateToken({ id: user.id, email: user.email });
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
    };
}

export async function login(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = bcrypt.compareSync(password, user.passowrd);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    const token = generateToken({ id: user.id, email: user.email });
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
    };
}

export async function logout(userId: number) {
    // Invalidate the token or perform any necessary cleanup
    // This is a placeholder as JWTs are stateless and don't require server-side logout
    return { message: 'User logged out successfully' };
}

export async function getUserById(id: number) {
    const user = await prisma.user.findUnique({
        where: { id },
    });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

export async function changePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = bcrypt.compareSync(currentPassword, user.passowrd);
    if (!isPasswordValid) {
        throw new Error('Invalid current password');
    }
    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
    await prisma.user.update({
        where: { id: userId },
        data: { passowrd: hashedNewPassword },
    });
    return { message: 'Password changed successfully' };
}

export async function resetPassword(email: string) {
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error('User not found');
    }
    // Here you would typically send a password reset email
    // For simplicity, we will just return a success message
    return { message: 'Password reset email sent' };
}