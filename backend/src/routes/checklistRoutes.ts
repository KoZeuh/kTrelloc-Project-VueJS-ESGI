import { Router } from 'express';
import { addChecklistItem, deleteChecklist, updateTitle, deleteChecklistItem, updateStateCheckListItemById } from '../controllers/checklistController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.delete('/delete/:checklistId', authenticateToken, deleteChecklist);

router.post('/item/add', authenticateToken, addChecklistItem);

router.put('/update/title', authenticateToken, updateTitle);

router.delete('/item/delete/:itemId', authenticateToken, deleteChecklistItem);

router.put('/item/update/state', authenticateToken, updateStateCheckListItemById);

export default router;
