import { Router } from "express";
import { validationMiddleware } from "../../middlewares/validation";
import { authenticate } from "../../middlewares/authenticate.middleware";
import { createPostSchema } from "../../schema/postSchema";
import { createPost, deletePost, listPost } from "../controllers/postcontroller";
const router = Router()

router.post("/new", authenticate, createPostSchema, validationMiddleware, createPost )
router.get("/list", listPost )
router.delete("/delete/:postId", deletePost )



export default router