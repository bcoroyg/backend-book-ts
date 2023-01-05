import { hash } from 'bcrypt';
import Debug from 'debug';
import mongoose from 'mongoose';
import config from '../../config';
import { User } from '../../database/models';
import { dbConnection } from '../../lib';
import { IUser } from '../interfaces';

//debug
const debug = Debug('app:seed:user');

const user: IUser = {
  username: <string>config.defaultAdminUsername,
  password: <string>config.defaultAdminPassword,
};

const createUser = async (user: IUser) => {
  const createdUser = await User.create(user);
  return createdUser?._id;
};

const seedUser = async () => {
  try {
    await dbConnection();
    const userId = await createUser({
      username: user.username,
      password: await hash(user.password, 10),
    });
    debug(`User created with id: ${userId}`);
    mongoose.connection.close();
    debug('Desconected database!');
  } catch (error) {
    debug(error);
    process.exit(1);
  }
};

seedUser();
