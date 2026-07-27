const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../model/blacklist.model.js");
const userModel = require("../model/user.model.js"); // 🟢 User model import karein

async function authUser(req, res, next) {
  try {
    // 1. Cookies YA Authorization Header dono se token extract karein
    const token =
      req.cookies?.token ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }

    // 2. Blacklist Check
    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });
    if (isTokenBlacklisted) {
      return res.status(401).json({
        message: "Token Is Invalid",
      });
    }

    // 3. JWT Verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🟢 4. GUARANTEED USER POPULATION: Database se user fetch karke req.user mein set karein
    const userId = decoded._id || decoded.id;
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User no longer exists",
      });
    }

    // Attach full user object (and normalized fallback)
    req.user = user;

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}

module.exports = { authUser };