var models = require('../models/crime');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/seattlecrimereports');

models.Crime.findOne({
  'zone_beat': 'Q1'
}, function(err, crime){
  console.log("err:", err)
  console.log("crime:", crime)
})
