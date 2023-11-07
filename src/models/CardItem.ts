import mongoose from 'mongoose';

import { IRating } from '@/models/Rating';

export interface ICardItem extends mongoose.Document {
  title: string;
  imgSrc: string;
  description: string;
  totalRates: number;
  avgRating: number;
  ratings: IRating[];
}

const CardItemSchema = new mongoose.Schema<ICardItem>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for this Card Item.'],
      maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    imgSrc: {
      type: String,
      required: [true, 'Please provide the img src for this Card Item'],
    },
    description: {
      type: String,
      required: [true, 'Please specify the description of your item.'],
      maxlength: [500, 'Description cannot be more than 300 characters'],
    },
    ratings: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Rating',
        },
      ],
      default: [],
    },
    avgRating: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.CardItem ||
  mongoose.model<ICardItem>('CardItem', CardItemSchema);
