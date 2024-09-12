const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user");

module.exports.authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      //console.log(err.message);
      return res.sendStatus(401);
    } else {
      const userId = decoded.user; // This should contain the user's ID
      try {
        const userAvailable = await User.findOne({ _id: userId });
        if (userAvailable) {
          req.user = userAvailable; // Set the user object to `req.user`
          next();
        } else {
          return res.status(403).json({ message: "Unauthorized" });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });
};
