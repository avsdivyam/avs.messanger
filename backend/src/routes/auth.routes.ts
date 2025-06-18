import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';

const router = Router();

// Route for user signup
router.post('/register', AuthController.signup);
// Route for user login
router.post('/login', AuthController.login);
// Route for user logout
router.post('/logout', AuthController.logout);
// Route for changing password
router.put('/change-password', AuthController.changePassword);
// Route for resetting password
router.post('/reset-password', AuthController.resetPassword);

export default router;