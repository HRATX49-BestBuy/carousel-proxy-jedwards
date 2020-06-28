"use strict";

var express = require('express');

var app = express();
var PORT = process.env.PORT || 3333;

var http = require('http');

var httpProxy = require('http-proxy');

var apiProxy = httpProxy.createProxyServer();

var path = require('path');

var serverSearchbar = 'http://searchbarricardo2-dev.us-east-2.elasticbeanstalk.com/',
    serverItemImage = 'http://localhost:3002',
    serverCarousel = 'http://NewCarousel-env.eba-irp2rurw.us-east-2.elasticbeanstalk.com',
    serverReviews = 'http://111111-env.eba-9uquamkj.us-east-2.elasticbeanstalk.com/';
app.use(express["static"](path.join(__dirname, './dist')));
app.use(express.json());
app.all('/searchBar', function (req, res) {
  res.send('contact made from server searchBar');
  apiProxy.web(req, res, {
    target: serverSearchbar
  });
});
app.all('/carousel', function (req, res) {
  res.send('contact made from server carousel');
  apiProxy.web(req, res, {
    target: serverCarousel
  });
});
app.all('/itemImage', function (req, res) {
  res.send('contact made from server itemImage');
  apiProxy.web(req, res, {
    target: serverItemImage
  });
});
app.all('/reviews', function (req, res) {
  res.send('contact made from server reviews');
  apiProxy.web(req, res, {
    target: serverReviews
  });
});
app.listen(PORT, function () {
  console.log('Listening for request for all services');
});