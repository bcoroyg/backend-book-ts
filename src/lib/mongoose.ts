import Debug from 'debug';
import mongoose from 'mongoose';
import config from '../config';

const DB_USER = encodeURIComponent(<string>config.dbUser);
const DB_PASSWORD = encodeURIComponent(<string>config.dbPassword);

const MONGO_URI = config.dev
  ? `mongodb://${config.dbHost}:${config.dbPort}/${(config.test) ? "test": config.dbName}?retryWrites=true&w=majority`
  : `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${config.dbHost}:${config.dbName}?retryWrites=true&w=majority`;

export const dbConnection = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(MONGO_URI);
    const debug = Debug("app:server")
    debug('Connect success DB')
    //console.log('Connect success DB');
  } catch (error) {
    throw new Error('Error connect DB');
  }
};
