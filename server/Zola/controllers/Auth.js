/**
 *
 *
 * @notes   => authentication middleware
 **/

var jwt = require('jsonwebtoken');

module.exports = {
	validate : function (request, response, next) {

		if (!request.body.email || !request.body.password) {

			response.json({ error: "Email and password must be set." });

		} else {

			if (request.body.email === "test@zola.com" && request.body.password === "zola#frontend") {
				request.uid  = "thisrandomstring";

				next();
			} else {

				response.json({ error: "Email and password not found. Try another email." });
			}

		}
	},

	verify : function (request, response, next) {

		console.log('hllllllooooo');
		console.log(request.query);
		console.log(request.body);

		var token =  request.query.token || req.body.token;

		console.log(token);

		jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {

			if (err) {

				response.json({error : err});
			} else {

				request.token = decoded;
				next();
			}
		})
	},

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