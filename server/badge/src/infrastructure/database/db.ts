import mongoose from 'mongoose';
require('dotenv').config();

const dbString: string = process.env.PROBLEM_MONGO_URL || 'mongodb://localhost:27017/Atomica-Badge-Service'

const connectDb = async () => {
  try {
    console.log(dbString)
    await mongoose.connect(dbString)
      .then((data: any) => {
        console.log(`DB CONNECTED ON ${data.connection.host}`);
      });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDb, 5000); 
}
};

export default connectDb;
