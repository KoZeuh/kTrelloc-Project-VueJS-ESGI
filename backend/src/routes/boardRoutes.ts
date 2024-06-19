import { Router } from 'express';
import {
    getBoardsByUser,
    getBoardContentById,
    createBoard,
    updateBoard,
    deleteBoard,
    addMemberToBoard,
    removeMemberFromBoard,
    createListByBoardId
} from '../controllers/boardController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/get/:boardId', authenticateToken, getBoardContentById);
router.get('/getAllByUser', authenticateToken, getBoardsByUser);

router.post('/create', authenticateToken, createBoard);
router.post('/list/create', authenticateToken, createListByBoardId);
router.post('/addMember', authenticateToken, addMemberToBoard);


router.put('/update', authenticateToken, updateBoard);

router.delete('/delete/:boardId', authenticateToken, deleteBoard);
router.delete('/removeMember/:boardId/:userId', authenticateToken, removeMemberFromBoard);

export default router;
