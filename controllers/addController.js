const multer = require('multer');
const Image = require("../models/image");
const path = require('path');
const sharp = require('sharp');
const User = require("../models/user");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+path.extname(file.originalname));
  }
})

exports.upload = multer({storage: storage});

exports.index = (req,res) => {
  res.render('add', { title: 'add image', currentPage: "add", user: req.user});
}

exports.image_upload_post = (req, res) => {
  console.log(req.file);

  sharp('public/images/'+req.file.filename)
    .resize(320, 260)
    .toFile('public/images/thumb'+req.file.filename, (err) => {
      if (err) {return next(err);}

      let image = new Image(
        {
        title: req.body.title,
        category: req.body.category,
        description: req.body.details,
        filename: req.file.filename,
        thumbnail: 'thumb'+req.file.filename,
        originalname: req.file.originalname,
        date: new Date().toLocaleString(),
        coordinates: {"lat": req.body.lat, "lng": req.body.lng},
        user: req.user._id,
        }
      );

      image.save((err) => {
        if (err) { return next(err); }
        res.redirect("/");
      });

    })



};
