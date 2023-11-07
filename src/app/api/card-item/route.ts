import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import dbConnect from '@/lib/mongodb';
import CardItem from '@/models/CardItem';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { isUserToken } from '@/app/helpers/server/auth';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const token = await getToken({ req: request });
    if (!isUserToken(token)) {
      return NextResponse.json(
        { success: false, message: 'Invalid JWT' },
        { status: 401 },
      );
    }

    const results = await CardItem.find<API.Card>();

    return NextResponse.json({ success: true, data: results }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const token = await getToken({ req: request });
    if (!isUserToken(token)) {
      return NextResponse.json(
        { success: false, message: 'Invalid JWT' },
        { status: 401 },
      );
    }

    const data = await request.formData();
    const imageFile = data.get('image') as File;
    const fileBuffer = Buffer.from(await imageFile.arrayBuffer());

    const cloudinaryImageURL = await uploadToCloudinary(fileBuffer);

    const cardData = {
      title: data.get('title'),
      description: data.get('description'),
      imgSrc: cloudinaryImageURL,
    };

    const cardItem = await CardItem.create(cardData);

    return NextResponse.json(
      { success: true, data: cardItem },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
