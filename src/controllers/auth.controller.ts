import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';

const router = Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    try {
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
