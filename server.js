var express = require('express');
var ejs = require('ejs');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

var db = mongoose.connect('mongodb://localhost:27017/restocartes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(function(req,res,next){
	req.db = db
	next()
});

var mainRoutes = require('./routes/main');
app.use(mainRoutes);

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080, function(){
	console.log('Node.js listening on port ' + 8080)
});

