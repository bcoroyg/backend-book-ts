import { Strategy } from 'passport-local';
import createHttpError from 'http-errors';
import { compare } from 'bcrypt';

import { UserService } from '../../../services';

const _userService = UserService.getInstance();

export const LocalStrategy = new Strategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await _userService.getUserByEmail(email);

      //Verifica si el usuario existe
      if (!user) {
        return done(
          createHttpError(400, 'Incorrect email and/or password.'),
          false
        );
      }

      //Verifica si el password es correcto
      if (!(await compare(password, user.password))) {
        return done(
          createHttpError(400, 'Incorrect email and/or password.'),
          false
        );
      }
      //retorna el usuario
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
