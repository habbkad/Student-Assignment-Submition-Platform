const jwt = require("jsonwebtoken");
const errorResponse = require("../utils/errorResponse");
const user = require("../models/user");

exports.protect = async (req, res, next) => {
  let token;
  //console.log(req.headers);
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   token = req.headers.authorization.split(" ")[1];
  //   // console.log(token);
  // } else if (req.cookie) {
  //   token = req.cookie.token;
  // }
  //console.log(req.cookies);

  if (req.cookies) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new errorResponse("not authorized to access this route", 401));
  }
  // console.log(token);
  try {
    //verify token
    const decode = jwt.verify(token, process.env.JWT_SECRETE);
    req.user = await user.findById(decode.id);
    // console.log(req.user);
    next();
  } catch (err) {
    return next(new errorResponse("not authorized to access this route", 401));
  }
};

//has access to routes
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // console.log(req.user);
    if (!roles.includes(req.user.role)) {
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

//active account
exports.active = (req, res, next) => {
  if (!req.user.active) {
    return next(
      new errorResponse(
        `${res.user.role} not authorized to access this route. Account not active`,
        403
      )
    );
  }
  next();
};
