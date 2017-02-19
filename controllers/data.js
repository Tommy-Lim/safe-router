var express = require('express');
var router = express.Router();
var request = require('express');

router.route('/')
.get(function(req, res){
  res.send("test data root")
})

module.exports = router;
