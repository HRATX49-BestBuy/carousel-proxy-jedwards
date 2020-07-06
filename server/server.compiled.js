"use strict";

var express = require('express');

var app = express();

var path = require('path');

var PORT = process.env.PORT || 8008;

var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});
app.use(express["static"](path.join(__dirname, '../dist')));
app.use(express.json());
app.all('*', function (req, res) {
  var endpoint = req.params[0];

  if (endpoint === '/api/getReviews' || endpoint === '/api/getListOfRealProducts' || endpoint === '/api/getListOfRealProductsThumbnails') {
    proxy.web(req, res, {
      target: 'http://111111-env.eba-9uquamkj.us-east-2.elasticbeanstalk.com/'
    });
  } else if (endpoint === '/products') {
    proxy.web(req, res, {
      target: 'http://newcarousel-env.eba-irp2rurw.us-east-2.elasticbeanstalk.com/'
    });
  } else if (endpoint === '/api/get/products') {
    proxy.web(req, res, {
      target: 'http://searchbarricardo2-dev.us-east-2.elasticbeanstalk.com/'
    });
  } else if (endpoint === '/products2') {
    proxy.web(req, res, {
      target: 'http://Carousel2-env.eba-kxk2ammp.us-east-2.elasticbeanstalk.com'
    });
  } else if (endpoint === '/display') {
    proxy.web(req, res, {
      target: 'http://imagecomponent-env-1.eba-4mfwjdhg.us-east-2.elasticbeanstalk.com/'
    });
  } else if (endpoint === '/') {
    proxy.web(req, res, {
      target: 'NewFooter-env.eba-2v3fvsgb.us-east-2.elasticbeanstalk.com'
    });
  } else {
    res.status(400).send(endpoint);
  }
});
app.listen(PORT, function () {
  console.log("Proxy listening on port ".concat(PORT));
});
