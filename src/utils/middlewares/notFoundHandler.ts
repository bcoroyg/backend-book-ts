import { Request, Response } from 'express';
import createHttpError from 'http-errors';

export const notFoundHandler = (req: Request, res: Response) => {
  throw createHttpError(404);
};
