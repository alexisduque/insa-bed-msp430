var util = require('util');
var events = require('events');

var GreenhouseLight = {
  OFF: 0,
  ON: 1
};

function Greenhouse() {
  events.EventEmitter.call(this);
  this.temperature = 23;
  this.light = GreenhouseLight.OFF;
}

util.inherits(Greenhouse, events.EventEmitter);

module.exports.Greenhouse = Greenhouse;
module.exports.GreenhouseLight = GreenhouseLight;
