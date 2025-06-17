import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import authRoutes from './routes/auth.routes';

dotenv.config();
const app = express();
export const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Hello, World!');
})

app.use('/api/auth', authRoutes);

export default app;