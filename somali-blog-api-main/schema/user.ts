import { body } from 'express-validator';

export const RegistrationSchema = [
  body('email').isEmail().withMessage('Email must be valid email address'),
  body('fullname').isString().isLength({ min: 6, max: 100 }),
  body('password').isLength({ min: 8, max: 64 }),
  body('confirmPassword').isLength({ min: 8, max: 64 })
];

export const loginUserSchema = [
  body('email').isEmail().withMessage('Please provide valid email address'),
  body('password')
    .isLength({
      min: 8,
      max: 64
    })
    .withMessage('Password must be atleast 8 characters.')
];
