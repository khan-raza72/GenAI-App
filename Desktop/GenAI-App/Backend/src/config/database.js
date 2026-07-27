// src/config/database.js
const mongoose = require("mongoose");

const mongoUri =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/genai-app";

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Database Connected!");
    } catch (error) {
        console.error("❌ DB Connection Error details:", error.message);
        // Error ko dhyan se padho, wo batayega ki problem IP ki hai ya Auth ki.
    }
};

module.exports = connectToDB;
