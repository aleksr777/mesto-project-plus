import { model, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import { ERR_TEXT_INVALID_EMAIL_FORMAT } from '../constants/error-text';

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, ERR_TEXT_INVALID_EMAIL_FORMAT],
  },
  password: {
    type: String,
    required: true,
  },
});

export default model<IUser>('user', userSchema);
