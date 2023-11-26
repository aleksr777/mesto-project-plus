import { model, Schema } from 'mongoose';
import urlRegex from '../constants/url-regex';

export interface ICard {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes?: Schema.Types.ObjectId[];
  createdAt?: Date;
}

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v: string) {
        return urlRegex.test(v);
      },
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default model<ICard>('card', cardSchema);
