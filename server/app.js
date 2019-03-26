const express = require('express');
const path = require('path');
const apiRouter = require('./api');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', function logGetRequests(req, res, next) {
  console.log('someone made a request with GET method');
  next();
});
app.use('/api', apiRouter);

app.get('/', function(req, res) {
  res.send('index page, triggered by GET /');
});

module.exports = app;
