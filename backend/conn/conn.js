const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

conn();