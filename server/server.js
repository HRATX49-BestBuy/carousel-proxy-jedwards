const express = require('express');
const app = express();
const http = require('http');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

const serverSearchbar = 'http://localhost:3001',
      serverItemImage = 'http://localhost:3003',
      serverCarousel = 'http://localhost:3002',
      serverReviews = 'http://localhost:3004'

app.use(express.static(path.join(__dirname, './dist')));
app.use(express.json())

app.get('/searchBar', (req, res) => {

  res.send('contact made from server searchBar');
  apiProxy.web(req, res, {target: serverSearchbar});

});

app.get('/carousel', (req, res) => {

  res.send('contact made from server carousel');
  apiProxy.web(req, res, {target: serverCarousel});
});

app.get('/itemImage', (req, res) => {

  res.send('contact made from server itemImage');
  apiProxy.web(req, res, {target: serverItemImage});
});

app.get('/reviews', (req, res) => {

  res.send('contact made from server reviews');
  apiProxy.web(req, res, {target: serverReviews});
});

app.listen(3000);