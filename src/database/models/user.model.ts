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

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

export const User = model('user', UserSchema);
