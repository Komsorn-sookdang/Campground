const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");

// @desc   Login via Google
// @route  POST /api/v1/auth/google
// @access Public
exports.loginViaGoogle = async (req, res, next) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken: req.body.tokenId,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  console.log(payload);
  res.status(200).json({ success: true, data: payload });
};

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
    });
    // Create token
    // const token = user.getSignedJwtToken();
    // res.status(200).json({ success: true, token});
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false, msg: err });
    console.log(err.stack);
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  //validate email & password
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide an email and password" });
  }
  let user;
  //check for user
  try {
    user = await User.findOne({ email: email }).select("+password");
  } catch (err) {
    console.log(err.stack);
    return res.status(401).json({
      success: false,
      msg: "Cannot convert email or password to string",
    });
  }
  if (!user) {
    return res.status(400).json({ success: false, msg: "Invalid credentials" });
  }

  //check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({ success: false, msg: "Invalid credentials" });
  }

  //create token
  // const token = user.getSignedJwtToken();
  // res.status(200).json({success: true, token});
  sendTokenResponse(user, 200, res);
};

// @desc    Get current logged in user
// @route   POST /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
};

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode) /*.cookie('token', token, options)*/
    .json({
      success: true,
      //add for frontend
      _id: user._id,
      name: user.name,
      email: user.email,
      //end for frontend
      token,
    });
};

// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    data: {},
  });
};