import mongoose from "mongoose";

let isConnected: boolean = false; // track the connection

export const connectToMongo = async () => {
  // mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
