import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  name: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Username must be at least 3 characters'],
      maxLength: [20, 'name must be at most 20 characters'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    name: {
      type: String,
      required: [true, 'name is required'],
      minLength: [3, 'name must be at least 3 characters'],
      maxLength: [20, 'name must be at most 20 characters'],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.User ||
  mongoose.model<IUser>('User', UserSchema);
