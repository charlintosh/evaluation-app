import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    await connectDB();

    const { name, password, username } = await request.json();

    if (password.length < 6)
      return NextResponse.json(
        {
          success: false,
          message: 'Password must be at least 6 characters',
        },
        { status: 400 },
      );

    const userFound = await User.findOne({ username });

    if (userFound)
      return NextResponse.json(
        {
          success: false,
          message: 'Username already exists',
        },
        {
          status: 409,
        },
      );

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      username,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    return NextResponse.json(
      {
        success: true,
        data: {
          name,
          username,
          createdAt: savedUser.createdAt,
          updatedAt: savedUser.updatedAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        {
          status: 400,
        },
      );
    }
    return NextResponse.error();
  }
}
