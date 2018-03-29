const Image = require("../models/image");

exports.index_get = (req, res, next) => {
    res.render('index', { title: 'express-assignment', currentPage: "index"});
}
