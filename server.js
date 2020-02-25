const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const srv = http.createServer(app);

// Serve the assets
app.use(express.static(path.dirname(require.resolve('jquery'))));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/css', express.static('css'));
app.use('/img', express.static('img'));
app.use('/js', express.static('js'));
app.use('/vid', express.static('vid'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Store light sensor data received from post requests
var light1 = 0;
var light2 = 0;
var light3 = 0;

app.route('/data')
  // Retrieve light sensor data from RPi
  .post(function (req, res) {
    light1 = req.body.light1;
    light2 = req.body.light2;
    light3 = req.body.light3;
    console.log(light1);
    console.log(light2);
    console.log(light3);
    res.send('Lights updated');
  })
  // Serve the sensor data to the client
  .get(function (req, res) {
    var data = [parseInt(light1), parseInt(light2), parseInt(light3)];
    // data = JSON.stringify(data);
    res.send(data);
  })

// Store current laser states requested by client
var laser1 = 0;
var laser2 = 0;
var laser3 = 0;
var laser4 = 0;

app.route('/lasers')
  // Send the current laser state requests to the pi to turn the 
  // appropriate lasers on or off
  .get(function (req, res) {
    var states = [laser1, laser2, laser3, laser4];
    res.json(states);
    console.log(states);
    // reset laser states after sending them to pi
    laser1 = 0;
    laser2 = 0;
    laser3 = 0;
    laser4 = 0;
  })
  .post(function (req, res) {
    res.setHeader('Content-type', 'text/plain');
    res.send("Request received")
    if (parseInt(req.body.laser1) == 1) {
      laser1 = parseInt(req.body.laser1);
    }
    if (parseInt(req.body.laser2) == 1) {
      laser2 = parseInt(req.body.laser2);
    }
    if (parseInt(req.body.laser3) == 1) {
      laser3 = parseInt(req.body.laser3);
    }
    if (parseInt(req.body.laser4) == 1) {
      laser4 = parseInt(req.body.laser4);
    }
    console.log(laser1);
    console.log(laser2);
    console.log(laser3);
    console.log(laser4);

  })

// Send event data to the rpi for data logging

var event;
app.route('/event')
  .post(function (req, res) {
    res.setHeader('Content-type', 'application/json');
    console.log(req.body);
    event = req.body;
  })
  .get(function (req, res) {
    res.status(200).json(event)
  })

// Serve the procedure viewer at the root directory
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

srv.listen(3000);
