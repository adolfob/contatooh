var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var config = require('./oauth.js');

module.exports = function(){

	var Usuario = mongoose.model('Usuario');

	passport.serializeUser(function(usuario, done){
		console.log("Serializer user");
		done(null, usuario._id);
	});

	passport.deserializeUser(function(id, nome){
		console.log("Deserializer user");
		Usuario.findById(id).exec()
			.then(function(usuario) {
				done(null, usuario);
			});
	});

	passport.use(new FacebookStrategy({
		clientID: config.facebook.clientID,
		clientSecret: config.facebook.clientSecret,
		callbackURL: config.facebook.callbackURL
	}, function(accessToken, refreshToken, profile, done){
		Usuario.findOrCreate(
			{"login": profile.displayName},
			{"nome": profile.displayName},
			function(erro, usuario){
				if(erro){
					console.log(erro)
					return done(erro);
				}
				console.log(usuario);
				return done(null, usuario);
			})
	}))

	passport.use(new GitHubStrategy({
		clientID: config.github.clientID,
		clientSecret: config.github.clientSecret,
		callbackURL: config.github.callbackURL
	}, function(accessToken, refreshToken, profile, done){
		console.log(profile);
		console.log(accessToken);
		Usuario.findOrCreate(
			{"login": profile.username},
			{"nome": profile.username},
			function(erro, usuario){
				return done(erro, usuario);
			})
	}));

};