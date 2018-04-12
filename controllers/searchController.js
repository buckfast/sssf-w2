const Image = require("../models/image");

exports.index_get = (req, res, next) => {
    res.render('search', { title: 'search', currentPage: "search", user: req.user});
}
