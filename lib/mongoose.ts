import mongoose from "mongoose";

export const dbConnect = () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  const uri = process.env.MONGODB_URI as string;
  console.log(uri, "URi");
  return mongoose.connect(uri);
};
