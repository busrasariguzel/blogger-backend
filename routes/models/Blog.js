const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, trim:true},
  author: { type: String , trim:true},
  subject: { type: String, trim:true},
  article: { type: String, trim:true},

});

module.exports= mongoose.model('Blog', BlogSchema);