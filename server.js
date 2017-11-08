/**
 *
 *
 * @config  => Local Express Server
 * @port    => var/port.js, reference bin/www
 * @version => 1-0-0
 * @notes   => Establish main endpoint for local server
 **/


var express      = require('express'),
	path         = require('path'),
	logger       = require('morgan'),
	bodyParser   = require('body-parser'),
	debug        = require('debug')('http'),
	env      	 = require('./server/config/env'),
	router   	 = require('./server/config/router');

var App = express();

App.set('title', env.TITLE);
App.set('safe-title', env.SAFE_TITLE);
App.locals.title = App.get('title');
// ensure parsing in json and debugging for the server terminal
App.use(logger('dev'));
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: false }));
// extend router and serve the public directory from the Express App by default
App.use('/', router);
App.use(express.static(path.join(__dirname, 'public')));
App.use(debugReq);
// for all requests, ensure that the index.html file is always sent; this will ensure the app loads the react app
App.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

function debugReq(req, res, next) {
	debug('params:', req.params);
	debug('query:', req.query);
	debug('body:', req.body);
	next();
}

module.exports = App;
