// Include required modules
var sensorLib = require('node-dht-sensor');
var dweetClient = require("node-dweetio");

// Create Dweet.io client
var dweetio = new dweetClient();

// Read from sensor & send to Dweet.io
var sensor = {
  initialize: function () {
      return sensorLib.initialize(11, 4);
  },
  read: function () {

      // Read from sensor
      var readout = sensorLib.read();
      var temperature = readout.temperature.toFixed(2);
      var humidity = readout.humidity.toFixed(2);
      console.log('Temperature: ' + temperature + 'C, ' +
          'humidity: ' + humidity + '%');

      // Send to Dweet
      dweetio.dweet({temperature: temperature, humidity: humidity}, function(err, dweet){

        console.log(dweet.thing); // The generated name
        console.log(dweet.content); // The content of the dweet
        console.log(dweet.created); // The create date of the dweet
      });

      setTimeout(function () {
          sensor.read();
      }, 10000);
  }
};

// Initialize DHT11 sensor
if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}