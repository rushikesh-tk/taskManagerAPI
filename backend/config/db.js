import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connection : Successful @Host ${conn.connection.host}`);
  } catch (error) {
    console.log('MongoDB Connection : Unsuccessful')
    console.error(`Error : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;