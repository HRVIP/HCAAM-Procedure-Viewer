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

// Retrieve light sensor data from RPi
app.post('/postData', (req, res) => {
  light1 = req.body.light1;
  light2 = req.body.light2;
  light3 = req.body.light3;
  console.log(light1);
  console.log(light2);
  console.log(light3);
  res.send('Lights updated');
});

// Serve the sensor data to the client
app.get('/getData', (req, res) => {
  var data = { // this is the data you're sending back during the GET request
    light1: light1,
    light2: light2,
    light3: light3,
  }
  data = JSON.stringify(data);
  res.status(200).json(data);
});

// Store current laser states requested by client
var laser1 = 0;
var laser2 = 0;
var laser3 = 0;

app.post('/laserRequest', (req, res) => {
  res.setHeader('Content-type', 'application/json');
  console.log(req.body);

  laser1 = req.body["laser1"];
  laser2 = req.body["laser2"];
  laser2 = req.body["laser3"];
})

// Send the current laser state requests to the pi to turn the 
// appropriate lasers on or off
app.get('/laserOrder', (req, res) => {
  var states = {
    laser1: laser1,
    laser2: laser2,
    laser3: laser3
  }
  res.status(200).json(states);
});


// Serve the procedure viewer at the root directory
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

srv.listen(3000);
