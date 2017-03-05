var express = require('express');
var router = express.Router();
var request = require('express');
var models = require('../models/crime');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/seattlecrimereports');

router.route('/:query')
.get(function(req, res){
	queryObject = JSON.parse(decodeURIComponent(req.params.query))
	console.log(queryObject)
  models.Crime.find({
    'latitude': {$gte: queryObject.boundaries.lat.south, $lte: queryObject.boundaries.lat.north},
    'longitude': {$gte: queryObject.boundaries.lng.west, $lte: queryObject.boundaries.lng.east},
		'event_clearance_code': {$in: queryObject.codes}
  }, function(err, crimes){
    // console.log("err:", err);
    // console.log("crimes:", crimes);
    result = {result: crimes}
    return res.send(result)
  })
})

module.exports = router;
