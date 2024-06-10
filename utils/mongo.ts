import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToMongo = async () => {
  // mongoose.set("strictQuery", true);

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);

    isConnected = true;

  } catch (error) {
  }
};
