import mongoose from "mongoose";

const MONGODB_URI = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;

if (!MONGODB_URI) {
  throw new Error("Te rugăm să definești DB_URI în .env.local");
}

let cached = (globalThis as any).mongoose;

if (!cached) {
  cached = (globalThis as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: DB_NAME,
      bufferCommands: false,
    };

    mongoose.connection.on("connected", () =>
      console.log("🟢 MongoDB connected"),
    );
    mongoose.connection.on("error", (err) =>
      console.error("🔴 MongoDB error:", err),
    );

    cached.promise = mongoose
      .connect(`${MONGODB_URI}`, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
