/**
 *
 * @config  => Local Connection Init
 * @version => 1-0-0
 * @notes   => Establish server connection with local app
 **/


var http  	   = require('http'),
	path  	   = require('path'),
	app        = require('../server'),
	debug 	   = require('debug')('http'),
	portConfig = require('../var/port');

var server = http.createServer(app);

app.set('port', normalizePort(portConfig.PORT));

server.listen(portConfig.PORT);
server.on('error', onErrorEvent);
server.on('listening', onListeningEvent);


// hoisted support functions
function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	} else if (port >= 0) {
		return port;
	}

	return false;
}

function onErrorEvent(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = (typeof portConfig.PORT === 'string') ? 'Pipe ' + portConfig.PORT : 'Port ' + portConfig.PORT;

	switch (error.code) {
		case 'EACCES':

			console.error('___EACCES_ERROR___: ' + bind);
			process.exit(1);
			break;
		case 'EADDRINUSE':

			console.error('___EADDRINUSE_ERROR___: ' + bind);
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function onListeningEvent() {
	var addr = server.address();
	var bind = (typeof addr === 'string') ? 'pipe ' + addr : 'port ' + addr.port;

	console.log('Local Express Server listening event on: ' + bind);
}