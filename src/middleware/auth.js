const jwt = require("jsonwebtoken");
const errorResponse = require("../utils/errorResponse");
const user = require("../models/user");

exports.protect = async (req, res, next) => {
  let token;

  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  //   console.log(req.cookie);
  // } else if (req.cookie) {
  //   token = req.cookie.token;
  // }
  if (req.cookie) {
    token = req.cookie.token;
  }

  if (!token) {
    return next(new errorResponse("not authorized to access this route", 401));
  }

  try {
    //verify token
    const decode = jwt.verify(token, process.env.JWT_SECRETE);
    req.user = await user.findById(decode.id);
    next();
  } catch (err) {
    return next(new errorResponse("not authorized to access this route", 401));
  }
};

//hass access to routes
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(res.user.role)) {
      return next(
        new errorResponse(
          `${res.user.role} not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
