const asyncHandler = require("express-async-handler");

// @desc Register a user
// @route /api/users/
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  // console.log(req.body)
  const { name, email, password } = req.body;
  console.log(name, email, password);

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }
  res.send("Register Route");
});

// @desc Login user
// @route /api/users/
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  res.send("Login Route");
});

module.exports = {
  registerUser,
  loginUser,
};
