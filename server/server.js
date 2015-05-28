var express = require('express');
var bodyParser = require('body-parser');
var storedMessages = [];
var app = express();

// Push Updates
// var WebSocketServer = require('ws').Server;
// var wss = new WebSocketServer({ port: 3001 });

// wss.broadcast = function(data) {
//   wss.clients.forEach(function(client) {
//     client.send(data);
//   });
// };

// REST API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/messages', function(request, response) {
  response.send(JSON.stringify(storedMessages));
});

app.post('/messages', function(request, response) {
  storedMessages.push(request.body.message);
  // wss.broadcast('Received a new message.');
  response.sendStatus(201);
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

