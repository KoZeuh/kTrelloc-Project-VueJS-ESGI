import { Router } from 'express';
import { getUserProfile, updateUserEmail } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile/update/email', authenticateToken, updateUserEmail)

export default router;
