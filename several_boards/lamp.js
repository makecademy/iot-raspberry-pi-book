// Libraries
var express = require('express');
var app = express();
var piREST = require('pi-arest')(app);

// Set ID & name
piREST.set_id('r6hwcy');
piREST.set_name('pi_lamp');
piREST.set_mode('bcm');

// Connect to cloud.aREST.io
piREST.connect();

// Start server
var server = app.listen(80, function() {
    console.log('Listening on port %d', server.address().port);
});
