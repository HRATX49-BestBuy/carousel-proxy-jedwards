const express = require('express');
const app = express();
const http = require('http');
const httpProxy = require('http-proxy');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')));

const proxy = httpProxy.createProxyServer({});

http.createServer((req,res) => {

  proxy.web(req, res, {target: 'http://localhost:3333'});

}).listen(8008);

app.all('*', (req, res) => {

    proxy.web(req, res, {

      target: 'http://localhost:8008',
    });
});


