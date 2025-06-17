import { Router } from 'express';
import * as userRoutes from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/profile/:id', userRoutes.getUser);
userRouter.put('/profile/:id', userRoutes.updateUser);
userRouter.delete('/profile/:id', userRoutes.deleteUser)
