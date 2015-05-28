var express = require('express');
var bodyParser = require('body-parser');
var storedMessages = [];
var app = express();

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
  response.sendStatus(201);
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
