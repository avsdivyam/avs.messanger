import { Router } from 'express';
import * as userRoutes from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middlewares';

const userRouter = Router();

userRouter.get('/profile/:id', authenticate, userRoutes.getUser);
userRouter.put('/profile/:id', authenticate, userRoutes.updateUser);
userRouter.delete('/profile/:id', authenticate, userRoutes.deleteUser)

export default userRouter;