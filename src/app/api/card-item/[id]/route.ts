import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

import dbConnect from '@/lib/mongodb';
import CardItem from '@/models/CardItem';
import User from '@/models/User';
import Rating from '@/models/Rating';
import { isUserToken } from '@/app/helpers/server/auth';

export async function GET(request: NextRequest, { params }: Routing.IdSlug) {
  try {
    await dbConnect();

    const token = await getToken({ req: request });
    if (!isUserToken(token)) {
      return NextResponse.json(
        { success: false, message: 'Invalid JWT' },
        { status: 401 },
      );
    }

    const userId = token.user._id;
    const cardItemId = params.id;

    const cardInfo = await CardItem.findOne({ _id: cardItemId }).populate({
      path: 'ratings',
      model: Rating,
      populate: {
        path: 'user',
        model: User,
        select: '-_id username',
      },
    });

    const existingRating = await Rating.findOne({
      user: userId,
      cardItem: cardItemId,
    });

    if (!cardInfo) {
      return NextResponse.json(
        { success: false, message: 'CardItem not found' },
        { status: 404 },
      );
    }

    const cardInfoWithUserRate = {
      ...cardInfo.toObject(),
      userRate: existingRating,
    };

    return NextResponse.json({
      success: true,
      data: cardInfoWithUserRate,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'An error occurred' },
      { status: 500 },
    );
  }
}
