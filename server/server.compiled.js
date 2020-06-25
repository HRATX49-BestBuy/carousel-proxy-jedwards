"use strict";

var express = require('express');

var app = express();

var http = require('http');

var httpProxy = require('http-proxy');

var cors = require('cors');

var path = require('path');

app.use(cors());
app.use(express["static"](path.join(__dirname, '../dist')));
var proxy = httpProxy.createProxyServer({});
http.createServer(function (req, res) {
  proxy.web(req, res, {
    target: 'http://localhost:3333'
  });
}).listen(8008);
app.all('*', function (req, res) {
  proxy.web(req, res, {
    target: 'http://localhost:8008'
  });
});
