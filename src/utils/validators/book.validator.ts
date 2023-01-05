import { Request } from 'express';
import { check } from 'express-validator';
import { validatorHandler } from '../middlewares';
import { isImageValid } from '../validatorCustomHandler';

export const bookIdValidator = [check('bookId').isMongoId(), validatorHandler];

export const createBookValidator = [
  check('title', 'El titulo es obligatorio').notEmpty(),
  check('description', 'La descripción es obligatoria')
    .notEmpty(),
  check('file').custom((f, { req }) =>
    isImageValid(['png', 'jpg', 'jpeg'], req as Request)
  ),
  validatorHandler,
];

export const updateBookValidator = [
  check('bookId').isMongoId(),
  check('title').optional().isString(),
  check('description').optional().isString(),
  check('file')
    .optional()
    .custom((f, { req }) =>
      isImageValid(['png', 'jpg', 'jpeg'], req as Request)
    ),
  validatorHandler,
];
