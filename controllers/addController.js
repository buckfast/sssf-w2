const multer = require('multer');
const Image = require("../models/image");
const path = require('path');
const sharp = require('sharp');
const ExifImage = require('exif').ExifImage;

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
  res.render('add', { title: 'express-assignment', currentPage: "add" });
}

exports.image_upload_post = (req, res) => {
  console.log(req.file);

  sharp('public/images/'+req.file.filename)
    .resize(320, 260)
    .toFile('public/images/thumb'+req.file.filename, (err) => {
/*
      try {
          new ExifImage({ image : 'public/images/'+req.file.filename }, (error, exifData) => {
              if (error) console.log('Error: '+error.message);
              else console.log(exifData);
          });
      } catch (error) {console.log('Error: ' + error.message);}
*/
    console.log(req.body.lat+", "+req.body.lng);
      var image = new Image(
        {
        title: req.body.title,
        category: req.body.category,
        description: req.body.details,
        filename: req.file.filename,
        thumbnail: 'thumb'+req.file.filename,
        originalname: req.file.originalname,
        date: new Date().toLocaleString(),
        coordinates: {"lat": req.body.lat, "lng": req.body.lng},
        }
      );

      image.save((err) => {
        if (err) { return next(err); }
        res.redirect("/");
      });

    })



};
