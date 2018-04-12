const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const Image = require("../models/image");

exports.loggedIn = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.redirect("/users/login");
};

exports.loggedInAs = (req, res, next) => {
  Image.findById(req.params.id).exec((err, image) => {
    if (err) {res.redirect(303,"/")}

    if (req.isAuthenticated() && (typeof req.user !== "undefined") && req.user._id.equals(image.user)) { next();}
    else {res.redirect(303,"/")}
  });

};

exports.index_get = (req, res, next) => {
  res.render("test", {user: req.username});
}

exports.login_get = (req, res, next) => {
    res.render('login', { title: 'Log in', currentPage: "users", user:req.user});
}
exports.logout_post = (req,res,next) => {
  req.logout();
  res.redirect("/users/login");
}
exports.signup_get = (req, res, next) => {
    res.render('signup', { title: 'Sign up', currentPage: "users", user: req.user});
}

exports.passport = (req,res,next) => {
  passport.authenticate('local');
  next();
}
exports.login_post =
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/users/login",
      failureFlash: false
    });

exports.signup_post = (req, res, next) => {
  const {username, password} = req.body;
    User.create({ username, password })
      .then(user => {
        req.login(user, err => {
          if (err) next(err);
          else res.redirect("/");
        });
      })
      .catch(err => {
        res.render('signup', { title: 'Sign up', currentPage: "users", user: req.user, error: err});

        if (err.name === "ValidationError") {
          res.redirect("/signup");
        } else next(err);
      });
}
