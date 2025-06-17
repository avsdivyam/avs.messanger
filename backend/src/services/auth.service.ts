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