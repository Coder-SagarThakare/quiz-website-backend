const config = require("./config");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { tokenTypes } = require("./token");
const { User, Teacher } = require("../models");

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }

    const user =
      (await User.findById(payload.sub)) ||
      (await Teacher.findById(payload.sub));

    if (!user || user.isDeleted) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
