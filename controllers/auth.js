const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
    if (req.user) {
      return res.redirect("/list");
    }
    res.render("login", {
      title: "Login",
    });
  };
  
  exports.postLogin = (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email))
      validationErrors.push({ msg: "Please enter a valid email address." });
    if (validator.isEmpty(req.body.password))
      validationErrors.push({ msg: "Password cannot be blank." });
  
    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return res.redirect("/login");
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });
  
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        req.flash("errors", info);
        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", { msg: "Success! You are logged in." });
        res.redirect(req.session.returnTo || "/list");
      });
    })(req, res, next);
  };

exports.logout = (req, res) => {
    req.logout(() => {
        console.log("User has logged out.");
    });
    req.session.destroy((err) => {
        if (err)
        console.log("Error : Failed to destroy the session during logout.", err);
        req.user = null;
        res.redirect("/");
    });
};

exports.getSignup = (req, res) => {
    if (req.user) {
      return res.redirect("/list");
    }
    res.render("signup", {
      title: "Create Account",
    });
  };
  
  exports.postSignup = async (req, res, next) => {
    const validationErrors = [];

    // Validate email
    if (!validator.isEmail(req.body.email)) {
        validationErrors.push({ msg: "Please enter a valid email address." });
    }

    // Validate password length
    if (!validator.isLength(req.body.password, { min: 8 })) {
        validationErrors.push({
            msg: "Password must be at least 8 characters long",
        });
    }

    // Validate password confirmation
    if (req.body.password !== req.body.confirmPassword) {
        validationErrors.push({ msg: "Passwords do not match" });
    }

    // If there are validation errors, flash errors and redirect to signup
    if (validationErrors.length) {
        req.flash("errors", validationErrors);
        return res.redirect("../signup");
    }

    // Normalize email
    req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false,
    });

    try {
        // Check if a user already exists with the provided email or username
        const existingUser = await User.findOne({
            $or: [{ email: req.body.email }, { userName: req.body.userName }]
        });

        // If a user already exists, flash an error and redirect to signup
        if (existingUser) {
            req.flash("errors", {
                msg: "Account with that email address or username already exists.",
            });
            return res.redirect("../signup");
        }

        // Create a new user
        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
        });

        // Save the user to the database
        await user.save();

        // Log the user in
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/list");
        });
    } catch (err) {
        return next(err);
    }
};
