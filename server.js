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
app.use(bodyParser.urlencoded({
  extended: false,
}));

// Store sensor data received from post requests
let light1 = 0;
let light2 = 0;
let light3 = 0;
let hall1 = 0;
let accel1 = 0;

app.route('/data')
// Retrieve sensor data from RPi
    .post(function(req, res) {
      light1 = req.body.light1;
      light2 = req.body.light2;
      light3 = req.body.light3;
      hall1 = req.body.hall1;
      accel1 = req.body.accel1;
      // console.log(light1);
      // console.log(light2);
      // console.log(light3);
      // console.log(hall1);
      // console.log(accel1);
      res.setHeader('Content-type', 'text/plain');
      res.send('Sensors updated');
    })
// Serve the sensor data to the client
    .get(function(req, res) {
      const data = [parseInt(light1), parseInt(light2), parseInt(light3), +
      parseInt(hall1), parseInt(accel1),
      ];
      res.send(data);
    });

// Store current laser states requested by client
let laser1 = 0;
let laser2 = 0;
let laser3 = 0;
let laser4 = 0;

app.route('/lasers')
// Send the current laser state requests to the pi to turn the
// appropriate lasers on or off
    .post(function(req, res) {
      res.setHeader('Content-type', 'text/plain');
      res.send('Request received');
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
    })
    .get(function(req, res) {
      const states = [laser1, laser2, laser3, laser4];
      res.json(states);
      // reset laser states after sending them to pi
      laser1 = 0;
      laser2 = 0;
      laser3 = 0;
      laser4 = 0;
    });

// Send event data to the rpi for data logging
let event;
let currentStep;
app.route('/event')
    .post(function(req, res) {
      res.setHeader('Content-type', 'text/plain');
      res.send('Event logged');
      event = req.body.event;
      currentStep = req.body.currentStep;
    })
    .get(function(req, res) {
      const data = [event, currentStep];
      res.json(data);
      event = '';
    });

// Post and get current trial file name
let fileName = 'error.csv';
// If fileName not updated, error.csv will be displayed
app.route('/fileName')
// Receive name from rpi
    .post(function(req, res) {
      fileName = req.body.file;
      res.setHeader('Content-type', 'text/plain');
      res.send('File name received');
    })
// Give name to client
    .get(function(req, res) {
      res.send(fileName);
    });

let date;
app.route('/date')
// Store the date as indicated from login form
    .post(function(req, res) {
      date = req.body.id;
      res.setHeader('Content-type', 'text/plain');
      res.send('Date received');
    })
// Send date to rpi to store in trial data file
    .get(function(req, res) {
      res.json(date);
    });

let subject;
app.route('/subject')
// Store subject ID as indicated from login form
    .post(function(req, res) {
      subject = req.body.id;
      res.setHeader('Content-type', 'text/plain');
      res.send('Subject id received');
    })
// Send subject name to rpi to store in trial data file
    .get(function(req, res) {
      res.json(subject);
    });

let group;
app.route('/group')
// Store group as indicated from login form
    .post(function(req, res) {
      group = req.body.group;
      res.setHeader('Content-type', 'text/plain');
      res.send('Group received');
    })
// Send group name to rpi to store in trial data file
    .get(function(req, res) {
      res.json(group);
    });

// Serve the completed current trial file for download
const getFile = function(req, res) {
  res.sendFile(__dirname + '/trials/' + req.params.fileName);
};
app.get('/trials/:fileName', getFile);

// Serve the procedure viewer at the root directory after the login is complete
app.get('/start', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

// Serve the login form at the root directory
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/login.html');
});

srv.listen(3000);
