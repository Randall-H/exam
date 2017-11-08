/**
 *
 *
 * @config  => Global SubEnvironment Middleware
 * @version => 1-0-0
 * @notes   => Establish SubEnvironment variables
 **/

require('dotenv').load();

var _ = require('lodash');
var VARIABLES = {
	TITLE	   : 'Zola Exam',
	SAFE_TITLE : 'Zola Exam',
	JWT_SECRET : 'fTenmwjkBX7F97ThjHMVCdKbZvRb9MsC',
	PORT 	   : '80'
};


module.exports = _.extend(process.env, VARIABLES);