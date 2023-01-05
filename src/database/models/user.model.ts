import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = model('user', UserSchema);
