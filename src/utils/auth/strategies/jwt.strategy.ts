import { ExtractJwt, Strategy } from 'passport-jwt';
import config from '../../../config';

export const JwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
  },
  async (payload, done) => {
    try {
      done(null, payload);
    } catch (error) {
      done(error, false);
    }
  }
);
