import mongoose from "mongoose";
export const dbConnection = () => {
  try {
    const conStr = process.env.MONGO_CLIENT;
    if (!conStr) {
      return console.log(
        "there is no connection string available in process.env."
      );
    }
    const conn = mongoose.connect(conStr);
    conn && console.log("mongo db connected");
  } catch (error) {
    console.log(error);
  }
};
