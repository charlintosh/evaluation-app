import { NextRequest, NextResponse } from 'next/server';

import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const data = await request.json();

    const user = await User.create(data);

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
