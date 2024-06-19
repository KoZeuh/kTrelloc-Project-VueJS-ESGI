import { Router } from 'express';
import { getTags, addTagToCardId, deleteTagById } from '../controllers/tagController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/getAll', authenticateToken, getTags);

router.post('/create', authenticateToken, addTagToCardId);

router.delete('/delete/:tagId', authenticateToken, deleteTagById);

export default router;
