// Device ID & secret
var device_id = "device_id";
var device_secret = "device_secret";

// Required modules
var gpio = require('rpi-gpio');
var mqtt    = require('mqtt');

var client = mqtt.createClient(1883, "178.62.108.47", {
    username: device_id,
    password: device_secret,
    clientId: "7393956449"
});

// Topics
in_topic  = 'devices/' + device_id + '/get';
out_topic = 'devices/' + device_id + '/set';

// Set output pin
gpio.setMode(gpio.MODE_BCM);
gpio.setup(23, gpio.DIR_OUT);

 // Connect event
client.on('connect', function () {
  client.subscribe(in_topic);
});

// When message is received
client.on('message', function (topic, message) {
  
  // Message is Buffer 
  console.log(message.toString());

  json_data = JSON.parse(message.toString());

  // Check the status property value
  var value = json_data['properties'][0]['value']

  if (value == 'on') {
    gpio.write(23, true, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });
  }
  
  if (value == 'off') {
    gpio.write(23, false, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });
  }
  
  // Confirm to Lelylan
  client.publish(out_topic, message.toString())
});