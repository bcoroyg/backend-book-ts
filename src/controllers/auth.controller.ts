import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import { signTokenHandler } from '../utils';
import { IUser } from '../utils/interfaces';
import { authLoginValidator } from '../utils/validators';

const router = Router();

router.post(
  '/login',
  authLoginValidator,
  passport.authenticate('local', { session: false }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user } = req;
    try {
      const token = await signTokenHandler(<IUser>user);
      res.status(200).json({
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
