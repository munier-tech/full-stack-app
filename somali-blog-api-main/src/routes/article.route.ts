import { Router } from 'express';
import { CreateArticle } from '../../schema/article';
import { validationMiddleware } from '../../middlewares/validation';
import { authenticate } from '../../middlewares/authenticate.middleware';
import {
  createArticle,
  deleteArticles,
  getAllArticles,
  getMyArticles,
  getOneArticle
} from '../controllers/article.controller';
const router = Router();

router.get("/details/:articleId", getOneArticle),
router.delete("/delete1/:articleId" , deleteArticles)

router.post(
  '/new',
  authenticate,
  CreateArticle,
  validationMiddleware,
  createArticle
);

router.get('/my-articles', authenticate, getMyArticles);
router.get('/list', getAllArticles);
// router.delete("/delete/:articleId", authenticate, deleteArticle);


export default router;
