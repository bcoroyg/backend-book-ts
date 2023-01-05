import { NextFunction, Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';

export const validatorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(403).json({ errors: result.array() });
    }
    //Limpiando body
    req.body = { ...matchedData(req) };
    return next(); //TODO Continua hacia el controlador!
  } catch (error) {
    next(error)
  }
};
