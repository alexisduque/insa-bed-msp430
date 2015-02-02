var util = require('util');
var bleno = require('bleno');

var GreenhouseLightCharacteristic = require('./greenhouse-airbag-characteristic');

function GreenhouseLightService(greenhouse) {
    bleno.PrimaryService.call(this, {
        uuid: '496e264d-6f74-696e-0130-000000000000',
        characteristics: [
            new GreenhouseLightCharacteristic(greenhouse),
        ]
    });
}

util.inherits(GreenhouseLightService, bleno.PrimaryService);

module.exports = GreenhouseLightService
