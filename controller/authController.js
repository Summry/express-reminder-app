const passport = require("../middleware/passport");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // implement
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "/login",
    })(req, res);
  },

  registerSubmit: (req, res) => {
    // implement
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "/register",
    })(req, res);
  },

  logoutSubmit: (req, res) => {
    req.logout((err) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/login");
    });
  }
};

module.exports = authController;
