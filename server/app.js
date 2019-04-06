const express = require('express');
const path = require('path');
const apiRouter = require('./api');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', function logGetRequests(req, res, next) {
  console.log('someone made a request with GET method');
  next();
});

app.get('/', function(req, res) {
  res.send('index page, triggered by GET /');
});
app.use('/api', apiRouter);

module.exports = app;
