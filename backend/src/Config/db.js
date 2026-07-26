import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const database = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database Connected ${database.connection.host}`);
  } catch (error) {
    console.log(`Network error  ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
