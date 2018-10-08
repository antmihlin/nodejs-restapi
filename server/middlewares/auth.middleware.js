/*
 * Authorization
 */

//Checks if users logged in
exports.isLoggedIn = function(){
	return function(req, res, next) {
	  if(req.isAuthenticated()) {
		return next();
	  }
	  return res.status(401).send("Can't authenticate user");
	};
};
