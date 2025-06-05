const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

let isConnected = false;
const connectDB = async () => {
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  if (mongoose.connections[0].readyState) {
    isConnected = true;
    console.log("=> Already connected");
    return;
  }

  try {
    // const conn = await mongoose.connect(process.env.MONGO_URI);
    // console.log(`MongoDB Connected: ${conn.connection.host}`);

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error", error);
    throw error;
  }
};

module.exports = connectDB;
