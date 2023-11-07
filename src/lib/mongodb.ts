import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI must be defined in .env.local file');
}

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI);
    return Promise.resolve(connection.readyState === 1);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export default connectDB;
