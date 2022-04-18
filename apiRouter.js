var express = require('express');
var usersCtrl = require('./routes/usersController');





//router

exports.router = (function(){

	var apiRouter = express.Router();

	//users routes
	apiRouter.route('/users/register').post(usersCtrl.register);
	apiRouter.route('/users/login').post(usersCtrl.login);
	apiRouter.route('/users/me/').get(usersCtrl.getUserProfile);
	

	return apiRouter;

})();