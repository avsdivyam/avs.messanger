import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';

const router = Router();

// Route for user signup
router.post('/signup', AuthController.signup);
// Route for user login
router.post('/login', AuthController.login);

export default router;