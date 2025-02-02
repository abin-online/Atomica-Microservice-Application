import mongoose from 'mongoose';
require('dotenv').config();

const dbString: string = process.env.COMPILER_MONGO_URL || '9f5eUQJpuH3ejfuA';

const connectDb = async () => {
  try {
    await mongoose.connect(dbString)
      .then((data: any) => {
        console.log(`DB CONNECTED ON ${data.connection.host}`);
      });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDb, 5000); // Retry on failure
  }
};

export default connectDb;
