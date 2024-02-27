const userModel = require("../models/user");
const errorResponse = require("../utils/errorResponse");
//desc   signUp new user
//route  api/v1/user
//secure false
exports.signUpUser = async (req, res, next) => {
  const { email, password, role } = req.body;
  const newUser = await userModel.create({ email, password, role });

  //create token
  cookieResponse(newUser, 200, res);
  next();
};
//desc   login new user
//route  api/v1/user
//secure false
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new errorResponse("Provide valid credentials", 401));
  }

  //check password
  const isUser = await user.comparePassword(password);

  if (!isUser) {
    return next(new errorResponse("Provide valid credentials", 401));
  }

  //create token
  cookieResponse(user, 200, res);
  next();
};

//send cookie response
const cookieResponse = (user, statusCode, res) => {
  const token = user.getJsonWebToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    secure: true,
    httpOnly: true,
  };

  let userData = {
    id: user._id,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, ...userData, role: user.role, token });
};

//desc   signOut user
//route  api/v1/user
//secure false
exports.signOutUser = async (req, res, next) => {
  res
    .cookie("token", "", {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      secure: true,
      httpOnly: true,
    })
    .json({ message: "Signed out" });
  console.log(req.cookies, "bjhgfhfd");
  next();
};
