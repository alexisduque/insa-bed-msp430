var stream = require('stream');
var express = require('express');
var csv = require('csv');
var math = require('mathjs');
//var gpio = require('pi-gpio');
var mean = [];

function processMean(temp) {
  mean.unshift(temp);
  if (mean.length > 10)
    mean = mean.slice(0, 10);
  return math.mean(mean);
}

var gpioPin = 7;
var on = 1;

gpio.open(gpioPin, "output", function(err) {
  var on = 1;
  console.log('GPIO pin '+gpioPin+' is open. toggling LED every 100 mS for 10s');
  intervalId = setInterval(function() {
    gpio.write(gpioPin, on, function() {
      on = (on + 1) % 2;
    });
  }, 300);
});

durationId = setTimeout(function() {
  clearInterval(intervalId);
  clearTimeout(durationId);
  console.log('10 seconds blinking completed');
  gpio.write(gpioPin, 0, function() {
   gpio.close(gpioPin)
   });
}, 100000);



// Webserver
var app = express();
var server = app.listen(process.env.PORT || 8080);
var io = require('socket.io').listen(server);
app.use(express.static(__dirname + '/public'));
app.get('/smoothie.js', function(req, res) {
  res.sendfile('./node_modules/smoothie/smoothie.js');
});

// Data input
var csvStream = csv();
csvStream.from.options({columns: ['node_id', 'temp', 'rssi', 'mean']})
csvStream.transform(function(row) {
  row.node_id = parseInt(row.node_id);
  row.temp = parseFloat(row.temp);
  row.rssi = parseInt(row.rssi);
  row.mean = processMean(row.temp);
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

inputStream.pipe(csvStream);
