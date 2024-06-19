import { Router } from 'express';
import { updateTitle, updateDescription, updateCardDeadlineById, duplicateCardById, deleteCard, addMemberToCard, removeCardMemberById, addChecklistToCardId, getAttachmentsByCardId, addAttachmentToCardId, deleteAttachmentById, archiveCardById } from '../controllers/cardController';
import { authenticateToken } from '../middleware/authMiddleware';

const multer = require('multer');

const router = Router();
const upload = multer({ dest: 'uploads/' });



router.put('/update/title', authenticateToken, updateTitle);
router.put('/update/description', authenticateToken, updateDescription);
router.put('/update/deadline', authenticateToken, updateCardDeadlineById);

router.delete('/delete/:cardId', authenticateToken, deleteCard);

router.delete('/member/remove/:memberId', authenticateToken, removeCardMemberById);
router.post('/member/add', authenticateToken, addMemberToCard);

router.post('/checklist/add', authenticateToken, addChecklistToCardId);

router.post('/duplicate/:cardId', authenticateToken, duplicateCardById);

router.get('/attachment/get/:cardId', authenticateToken, getAttachmentsByCardId);
router.post('/attachment/add/:cardId', authenticateToken, upload.single('file'), addAttachmentToCardId);
router.delete('/attachment/remove/:attachmentId', authenticateToken, deleteAttachmentById);

router.put('/archive/:cardId', authenticateToken, archiveCardById);

export default router;
