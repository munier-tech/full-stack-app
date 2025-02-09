import { body } from "express-validator";

export const createPostSchema = [
  body('title')
    .isLength({ min: 6, max: 64 })
    .withMessage('post title must be between six and 64 characters'),
  body('desc').isLength({ min: 10 }).withMessage('desc is too short.'),
]