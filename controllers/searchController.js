const Image = require("../models/image");

exports.index_get = (req, res, next) => {

    // if(req.query.q != undefined) {
    //   var query = {}
    // query = {$or:[{title:{$regex: req.query.q, $options: 'i'}},{description:{$regex: req.query.q, $options: 'i'}}]}
    //
    //   Image.find(query, (err, data) => {
    //    if(err) {next(err);}
    //    //res.send({picArray: data });
    //    res.render('search', { title: 'search', currentPage: "search", picArray: data});
    //
    //   });
    // } else {
    //
    //   res.render('search', { title: 'search', currentPage: "search"});
    // }
    res.render('search', { title: 'search', currentPage: "search"});
}
