"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.login = login;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const jwt_1 = require("../utils/jwt");
const prisma = new client_1.PrismaClient();
async function signup(name, email, password) {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const hashedPassword = bcrypt_1.default.hashSync(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            passowrd: hashedPassword,
        }
    });
    const token = (0, jwt_1.generateToken)({ id: user.id, email: user.email });
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
    };
}
async function login(email, password) {
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = bcrypt_1.default.compareSync(password, user.passowrd);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    const token = (0, jwt_1.generateToken)({ id: user.id, email: user.email });
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
    };
}
