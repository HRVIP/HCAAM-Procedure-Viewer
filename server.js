const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const srv = http.createServer(app);

// Serve the assets
app.use(express.static(path.dirname(require.resolve('jquery'))));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/css', express.static('css'));
app.use('/img', express.static('img'));
app.use('/js', express.static('js'));
app.use('/vid', express.static('vid'));

// Serve the procedure viewer at the root directory
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

srv.listen(3000);
