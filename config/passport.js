const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          // Find the user by email
          const user = await User.findOne({ email: email.toLowerCase() });

          // If user not found, return with an error message
          if (!user) {
            return done(null, false, { msg: `Email ${email} not found.` });
          }

          // If the user has no password (registered with a sign-in provider)
          if (!user.password) {
            return done(null, false, {
              msg: "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
            });
          }

          // Compare the provided password with the stored hash
          const isMatch = await user.comparePassword(password);

          // If the password matches, return the user object
          if (isMatch) {
            return done(null, user);
          }

          // If the password does not match, return with an error message
          return done(null, false, { msg: "Invalid email or password." });
        } catch (err) {
          // Handle any errors
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
