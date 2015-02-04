var util = require('util');

//
// Require bleno peripheral library.
// https://github.com/sandeepmistry/bleno
//
var bleno = require('bleno');
var gpio = require('pi-gpio');

gpio.write(16, 1, function() {            // Set pin 16 high (1)
   // gpio.close(16);                       // Close pin 16
});

//
// Greenhouse
//
var greenhouse = require('./greenhouse');

//
// The BLE Greenhouse Service!
//
var GreenhouseLightService = require('./greenhouse-light-service');

//
// A name to advertise our Greenhouse Service.
//
var name = 'GreenH';
var greenhouseLightService = new GreenhouseLightService(new greenhouse.Greenhouse());

// Wait until the BLE radio powers on before attempting to advertise.
// If you don't have a BLE radio, then it will never power on!
//
bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    //
    // We will also advertise the service ID in the advertising packet,
    // so it's easier to find.
    //
    bleno.startAdvertising(name, [greenhouseLightService.uuid], function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.log('advertising...');
    bleno.setServices([
      greenhouseLightService,
    ]);
  }
});
