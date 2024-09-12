const express = require("express");
const router = express.Router();
const {
  Sign_up,
  Sign_in,
  userProfile,
  Sign_out
} = require("../controllers/userController"); // Ensure 'Sign_out' is included

const { authMiddleware } = require("../middlewares/authMiddleware"); // Use the destructured import

router.route("/signin").post(Sign_in);
router.route("/signup").post(Sign_up);
router.route("/profile").get(authMiddleware, userProfile); // Ensure authMiddleware is used here
router.route("/signout").post(Sign_out); // Add the signout route

module.exports = router;