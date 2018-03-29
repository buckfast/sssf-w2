const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    title: {type: String, required: true, max: 100},
    category: {type: String, required: true, max: 100},
    description: {type: String, required: false, max: 500},
    filename: {type: String, required: true},
    thumbnail: {type: String, required: true},
    originalname: {type: String, required: true},
    date: {type: Date, required: true},
    coordinates: {type:
      {
        lat: {Type: Number},
        lng: {Type: Number},
      }
    },
  }
);
/*
ImageSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + filename;
});
*/

module.exports = mongoose.model('Image', ImageSchema);
