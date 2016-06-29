// Libraries
var express = require('express');
var app = express();
var piREST = require('pi-arest')(app);
var sensorLib = require('node-dht-sensor');

// Set ID & name
piREST.set_id('p5dgwt');
piREST.set_name('pi_sensor');

// Connect to cloud.aREST.io
piREST.connect();

// Start server
var server = app.listen(80, function() {
    console.log('Listening on port %d', server.address().port);
});

// Sensor readout
var sensor = {
  initialize: function () {
    return sensorLib.initialize(11, 4);
  },
  read: function () {

    // Read
    var readout = sensorLib.read();
    temperature = readout.temperature.toFixed(2);
    humidity = readout.humidity.toFixed(2);

    // Set variables
    piREST.variable('temperature', temperature);
    piREST.variable('humidity', humidity);
    console.log('Temperature: ' + temperature + 'C, ' +
        'humidity: ' + humidity + '%');

    // Repeat
    setTimeout(function () {
        sensor.read();
    }, 2000);
  }
};

// Init sensor
if (sensor.initialize()) {
  sensor.read();
} else {
  console.warn('Failed to initialize sensor');
}
