"use strict";

var express = require('express');

var app = express();

var path = require('path');

var PORT = process.env.PORT || 8008;

var httpProxy = require('http-proxy');

var apiProxy = httpProxy.createProxyServer();
var serverSearchbar = 'http://searchbarricardo2-dev.us-east-2.elasticbeanstalk.com/',
    serverItemImage = 'http://imagecomponent-env-1.eba-4mfwjdhg.us-east-2.elasticbeanstalk.com',
    serverCarousel = 'http://newcarousel-env.eba-irp2rurw.us-east-2.elasticbeanstalk.com/',
    serverReviews = 'http://111111-env.eba-9uquamkj.us-east-2.elasticbeanstalk.com/';
app.use(express["static"](path.join(__dirname, '../dist')));
app.use(express.json());
app.all('/api/get/products', function (req, res) {
  apiProxy.web(req, res, {
    target: serverSearchbar
  });
  res.send('contact made from server searchBar');
});
app.all('/products', function (req, res) {
  console.log('made contact with carousel');
  apiProxy.web(req, res, {
    target: serverCarousel
  });
  res.send('contact made from server carousel');
});
app.all('/display', function (req, res) {
  apiProxy.web(req, res, {
    target: serverItemImage
  });
  res.send('contact made from server itemImage');
});
app.all('/api/getReviews', function (req, res) {
  apiProxy.web(req, res, {
    target: serverReviews
  });
  res.send('contact made from server reviews');
});
app.listen(PORT, function () {
  console.log("Listening for request for all services at port: ".concat(PORT));
});
