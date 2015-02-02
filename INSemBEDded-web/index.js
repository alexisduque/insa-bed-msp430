var stream = require('stream');
var express = require('express');
var csv = require('csv');

// Webserver
var app = express();
var server = app.listen(process.env.PORT || 8080);
var io = require('socket.io').listen(server);
app.use(express.static(__dirname + '/public'));
app.get('/smoothie.js', function (req, res) {
	res.sendfile('./node_modules/smoothie/smoothie.js');
});

// Data input
var csvStream = csv();
csvStream.from.options({columns: ['node_id', 'temp']})
csvStream.transform(function (row) {
	row.node_id = parseInt(row.node_id);
	row.temp = parseFloat(row.temp);
	row.rssi = parseInt(row.rssi);
    io.sockets.emit('message', row);
    return null;
});

var inputStream;
if (process.env.NODE_ENV != 'test') {
	inputStream = process.stdin;
} else { // fake data
	inputStream = require('./fake');
	setInterval(inputStream.generateData.bind(inputStream), 1000);
}

inputStream.pipe(csvStream)
