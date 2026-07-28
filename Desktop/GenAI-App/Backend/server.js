require("dotenv").config(); // Load environment variables first
const app = require("./src/app");
const connectToDB = require("./src/config/database");

const PORT = process.env.PORT || 3000;

// Pehle MongoDB connect hoga, uske baad server listen karega
connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `🚀 Custom Architecture Server is running on http://localhost:${PORT}`
    );
  });
});