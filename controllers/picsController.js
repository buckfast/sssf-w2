const Image = require("../models/image");

exports.index_get = (req, res, next) => {
  Image.find({}, (err, pics) => {
    res.send({picArray: pics });
  });
}
