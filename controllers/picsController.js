const Image = require("../models/image");



exports.index_get = (req, res, next) => {

  if(req.query.q != undefined) {
    var query = {}
    query = {$or:[{title:{$regex: req.query.q, $options: 'i'}},{description:{$regex: req.query.q, $options: 'i'}}]}

    Image.find(query, (err, data) => {
     if(err) {next(err);}
     res.send({picArray: data });
    });
  } else {
    Image.find({}).
    populate({
      path: "user",
      select: "username",
    }).
    exec((err, pics) => {
      res.send({picArray: pics});
    });
  }


}


exports.update_get = (req, res, next) => {
  Image.findById(req.params.id, (err, image) => {
    if (err) return next(err);
    res.render('update', { title: 'update', currentPage: "update", data: image, user: req.user});
  });
}

exports.update_post = (req, res, next) => {
  let image = new Image(
          { title: req.body.title,
            category: req.body.category,
            description: req.body.details,
            _id:req.params.id,
          }
  );
  Image.findByIdAndUpdate(req.params.id, image, {}, (err, img) => {
    if (err) { return next(err); }
    res.redirect("/");
  });
}

exports.delete_delete = (req, res, next) => {
  Image.findByIdAndRemove(req.params.id, (err, img) => {
    if (err) {return next(err);}
    //res.redirect(303,"/");
    res.json();
  });
}
