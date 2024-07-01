import mongoose from "mongoose";

export const connectToDatabase = async () => {
  if (!process.env.MONGODB_URL) {
    console.log("MONGODB URI is not defined");

    throw new Error("MONGODB_URI is not defined");
  }

  let isConnected: boolean = false;
  const MONGODB_URL: string = process.env.MONGODB_URL;

  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("MONGODB URI is not defined");
  }

  if (isConnected) {
    return console.log("MongoDB is already connected");
  }

  try {
    await mongoose.connect(MONGODB_URL, {
      dbName: "publicDiary",
    });

    isConnected = true;

    console.log("MongoDB is connected");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    throw new Error("An error occured");
  }
};
