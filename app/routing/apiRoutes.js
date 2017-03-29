var bcrypt = require("bcrypt");
var db = require("../../models");
var path = require("path");

module.exports = function(app){

	app.post('/api/register', function(req, res){
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(req.body.password, salt, function(err, hash) {
				// insertion into MySQL
				db.User.create({
					username: req.body.username,
				  	password: hash
				}).then(function (result) {
				 	res.send(200);
				}).catch(function (err) {
				  	res.send(500, err.errors[0].message);
				});
			});
		});
	});

	app.post('/api/post', function(req, res){
		db.Post.create({
			title: req.body.title,
			content: req.body.post,
			UserId: req.body.id
		}).then(function(dbAdventure){
			res.send('created');
		}).catch(function(err){
			res.send(500);
		});
	});

	app.post('/api/login', function(req, res){
		db.User.findOne({
			where: {username: req.body.username}
		}).then(function(dbUser){
			bcrypt.compare(req.body.password, dbUser.password, function(err, result) {
				if(result) {
					console.log('authorized');
					req.session.user = dbUser.dataValues;
					console.log(req.session.user);
					res.send(200);
				} else {
					console.log("not an authorized user");
					res.send(500);
				}
			});
		});
	});

	app.post('/api/findAll', function(req, res){
		db.Post.findAll({
			where: {UserId: req.body.id}
		}).then(function(dbPosts){
			res.send(dbPosts);
		});
	});

	app.get('/api/user', function(req, res){
		res.locals.user = req.session.user;
		res.send(res.locals.user);
	});

};