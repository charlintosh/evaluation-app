import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import dbConnect from '@/lib/mongodb';
import CardItem from '@/models/CardItem';
import Rating from '@/models/Rating';
import { isUserToken } from '@/app/helpers/server/auth';

export async function PUT(req: NextRequest, { params }: Routing.IdSlug) {
  try {
    await dbConnect();
    const token = await getToken({ req });
    if (!isUserToken(token)) {
      return NextResponse.json(
        { success: false, message: 'Invalid JWT' },
        { status: 401 },
      );
    }
    const userId = token.user._id;
    const cardItemId = params.id;
    const { rating, comments } = await req.json();

    const existingRating = await Rating.findOne({
      user: userId,
      cardItem: cardItemId,
    });

    if (existingRating) {
      if (typeof rating === 'number') {
        existingRating.rating = rating;
      }
      if (typeof comments === 'string') {
        existingRating.comments = comments;
      }
      await existingRating.save();
    } else {
      const newRating = new Rating({
        user: userId,
        cardItem: cardItemId,
        rating,
        comments,
      });
      await newRating.save();

      const cardItem = await CardItem.findOne({ _id: cardItemId });
      cardItem.ratings.push(newRating._id);
      await cardItem.save();
    }

    const updatedCardItem = await CardItem.findOne({
      _id: cardItemId,
    }).populate({
      path: 'ratings',
      model: Rating,
    });

    if (!updatedCardItem) {
      return NextResponse.json(
        { error: 'CardItem not found' },
        { status: 404 },
      );
    }

    const totalRatings = updatedCardItem.ratings.length;
    const totalRatingSum = updatedCardItem.ratings.reduce(
      (sum: number, { rating }: { rating: number }) => sum + rating,
      0,
    );
    const newAvgRating =
      totalRatings === 0 ? 0 : Math.floor(totalRatingSum / totalRatings);
    updatedCardItem.avgRating = isNaN(newAvgRating) ? 0 : newAvgRating;
    await updatedCardItem.save();

    return NextResponse.json(
      { success: true, data: updatedCardItem },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'There was an error adding/updating the rating' },
      { status: 400 },
    );
  }
}
