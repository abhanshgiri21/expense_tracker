'use strict';

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Token = require('../models//Token');

module.exports = function (passport) {

    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_SECRET;
    opts.passReqToCallback = true;

    passport.use(new JwtStrategy(opts, async function (req, jwt_payload, done) {
        (req.headers.authorization);
        let token = req.headers.authorization.split(' ')[1];
        let auth_token = await Token.query().where('token', token).andWhere('userId', jwt_payload.userId).eager('user').first();

        if (auth_token) {
            req.token = token;
            return done(null, auth_token.user);
        } else {
            return done(null, false);
        }
    }));
}
