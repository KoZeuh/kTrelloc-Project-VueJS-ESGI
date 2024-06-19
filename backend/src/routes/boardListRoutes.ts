import { Router } from 'express';
import { createCardToListId, updateTitle, deleteList , duplicateListById} from '../controllers/boardListController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/card/create', authenticateToken, createCardToListId);
router.put('/update/title', authenticateToken, updateTitle);
router.delete('/delete/:listId', authenticateToken, deleteList);
router.post('/duplicate/:listId', authenticateToken, duplicateListById);

export default router;
