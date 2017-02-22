var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
require('dotenv').config();

// DECODERS FOR DATA
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// PUBLIC DIRECTORY FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// MORGAN DEV LINTER
app.use(require('morgan')('dev'));

// API LAYERS
app.use('/api/data/', require('./controllers/data'));

// GET ROOT - SEND INDEX.html-
app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
