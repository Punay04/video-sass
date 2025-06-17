import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

let cached = global.mongose;

if (!cached) {
  cached = global.mongose = { conn: null, promise: null };
}

export async function connectDb() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.connect(MONGODB_URI!).then((mongoose) => {
      mongoose.connection;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
