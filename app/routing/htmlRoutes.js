var bcrypt = require("bcrypt");
var db = require("../../models");
var path = require("path");

module.exports = function(app){
	app.get('/', function(req, res) {
	  res.sendFile(path.join(__dirname,'/../public/', "index.html"));
	});

	app.get('/signup', function(req, res){
		res.sendFile(path.join(__dirname,'/../public/', "signup.html"));
	});

	app.get('/login', function(req, res){
		res.sendFile(path.join(__dirname, '/../public/', "signin.html"));
	});

	app.get('/signin', function(req, res){
		res.sendFile(path.join(__dirname,'/../public/', "blog.html"));
	});

	app.get('/logout', function(req, res) {
		//this will clear out our session data
	 	req.session.reset();
	 	res.redirect('/');
	});

};