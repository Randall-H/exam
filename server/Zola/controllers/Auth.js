/**
 *
 *
 * @notes   => authentication middleware. Documentation for the package jsonwebtoken can be found
 * at https://www.npmjs.com/package/jsonwebtoken for the 'jwt.sign' and 'jwt.verify' methods
 **/

var jwt = require('jsonwebtoken');

module.exports = {

	/**
	 * handle the validation of the Login.js data that was submitted
	 **/
	validate : function (request, response, next) {

		if (!request.body.email || !request.body.password) {

			response.json({ error: "Email and password must be set." });

		} else {
			// check specifically for the user:pass combo given in exam
			if (request.body.email === "test@zola.com" && request.body.password === "zola#frontend") {
				// there's no real need for a uid to be added to the session with the token but I think
				// its more realistic to add in anyway.
				request.uid  = "thisrandomstring";

				next();
			} else {

				response.json({ error: "Email and password not found. Try another email." });
			}

		}
	},

	/**
	 * parse token that was submitted with the getUsers request by the newly authenticated user
	 **/
	verify : function (request, response, next) {

		var token =  request.query.token || req.body.token;

		jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {

			if (err) {

				response.json({error : err});
			} else {

				request.token = decoded;
				next();
			}
		})
	},

	/**
	 * send the needed data back to the client after the verify middleware method above
	 **/
	login : function (request, response, next) {


		if (!request.uid) {
			response.json({ error: "User does not exist." });

		} else {

			if (request.body.password !== "zola#frontend") {

				response.json({ error: "Password is not valid." });
			} else {

				var token = jwt.sign({ uid: request.uid }, process.env.JWT_SECRET);
				response.json({ token: token, email: request.body.email, uid: request.uid, msg: request.body.email + " is now" +
				" logged in." })
			}

		}
	}
};