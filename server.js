
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

// Store sensor data received from post requests
var sensor1;
var sensor2;
app.post('/postData', (req, res) => {
  sensor1 = req.body.one;
  sensor2 = req.body.two;
});

// Serve the sensor data to the client
app.get('/getdata', (req, res) => {
  var data = { // this is the data you're sending back during the GET request
      data1: sensor1,
      data2: sensor2
  }
  res.status(200).json(data)
});

// Serve the procedure viewer at the root directory
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

srv.listen(3000);
