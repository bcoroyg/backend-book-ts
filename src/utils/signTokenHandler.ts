import { sign } from 'jsonwebtoken';
import config from '../config';
import { IUser } from './interfaces';

export const signTokenHandler = (user: IUser) => {
  return new Promise((resolve, reject) => {
    const { _id, username } = user;
    const payload = { uid: _id, username };
    sign(
      payload,
      <string>config.jwtSecret,
      { expiresIn: config.jwtTimeExpire },
      (err, token) => {
        if (err) {
          reject('Error, do not generate token');
        } else {
          resolve(token);
        }
      }
    );
  });
};
