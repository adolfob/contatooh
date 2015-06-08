var passport = require('passport');

module.exports = function(app){

	app.get('/auth/github', passport.authenticate('github'));
	app.get('/auth/github/callback', passport.authenticate('github', {
		successRedirect: '/'
	}));


	app.get('/auth/facebook', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/'
	}));

	app.get('/logout', function(req, res){
		req.logOut();
		res.redirect('/');
	});
}