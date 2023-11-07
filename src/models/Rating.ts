import mongoose from 'mongoose';

import { ICardItem } from '@/models/CardItem';
import { IUser } from '@/models/User';

export interface IRating extends mongoose.Document {
  user: IUser;
  cardItem: ICardItem;
  rating: number;
  comments: string;
}

const RatingSchema = new mongoose.Schema<IRating>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cardItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CardItem',
      required: true,
    },
    rating: Number,
    comments: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Rating ||
  mongoose.model<IRating>('Rating', RatingSchema);
