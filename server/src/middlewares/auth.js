const passport = require("passport");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const auth = (requiredRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      {
        session: false,
      },
      verifyCallBack(req, resolve, reject, requiredRights)
    )(req, res, next);
  })
    .then(() => {
      next();
    })
    .catch((err) => {
      next(err);
    });
};

const verifyCallBack = (req, resolve, reject, requiredRights) => {
  // err, user, info this data coming from jwtVerify() => done(null,user)
  return async (err, user, info) => {

    if (err || info || !user) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, "please authenticate")
      );
    }

    //Reject user if user is deleted
    if (user.isDeleted) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, "User deleted"));
    }
    req.user = user;
    console.log("REQ.USER : ",req.user);

    // check user role and give him rights
    if (requiredRights && req.user.role !== requiredRights) {
      return reject(new ApiError(httpStatus.FORBIDDEN, "Access Forbidden"));
    }

    resolve();
  };
};

module.exports = auth;
