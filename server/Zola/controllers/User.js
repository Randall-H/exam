/**
 *
 *
 * @notes   => basic seeding of data given in test
 **/

var UserModel = require('../models/User');

module.exports = {
	getData : function (request, response, next) {

		response.json({ data : UserModel.data });
	}
};
