var express = require('express');
var router = express.Router();
var request = require('express');
var models = require('../models/crime');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/seattlecrimereports');

router.route('/:query')
.get(function(req, res){
	console.log(req.params.query)
	queryObject = JSON.parse(decodeURIComponent(req.params.query))
	console.log(queryObject)
  models.Crime.find({
    'latitude': {$gte: queryObject.lat.south, $lte: queryObject.lat.north},
    'longitude': {$gte: queryObject.lng.west, $lte: queryObject.lng.east},
    // 'event_clearance_code': 10



  }, function(err, crimes){
    console.log("err:", err);
    console.log("crimes:", crimes);
    result = {result: crimes}
    return res.send(result)
  })
})

module.exports = router;
