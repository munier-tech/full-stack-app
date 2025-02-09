import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate.middleware';
import { CreateCommentSchema } from '../../schema/comment';
import { validationMiddleware } from '../../middlewares/validation';
import {
  createComment,
  deleteComment,
  getArticleComments
} from '../controllers/comments.controller';
const router = Router();

router.post(
  '/create',
  authenticate,
  CreateCommentSchema,
  validationMiddleware,
  createComment
);

router.delete("/delete/:commentId", deleteComment);
router.get('/article/:articleId', getArticleComments);

export default router;
