const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

exports.index_get = (req, res, next) => {
    res.render('login', { title: 'Log in', currentPage: "users"});
}
