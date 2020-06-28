const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;
const http = require('http');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const path = require('path');

const serverSearchbar = 'http://searchbarricardo2-dev.us-east-2.elasticbeanstalk.com/',
      serverItemImage = 'http://localhost:3002',
      serverCarousel = 'http://NewCarousel-env.eba-irp2rurw.us-east-2.elasticbeanstalk.com',
      serverReviews = 'http://111111-env.eba-9uquamkj.us-east-2.elasticbeanstalk.com/'

app.use(express.static(path.join(__dirname, './dist')));
app.use(express.json())

app.all('/searchBar', (req, res) => {

  res.send('contact made from server searchBar');
  apiProxy.web(req, res, {target: serverSearchbar});

});

app.all('/carousel', (req, res) => {

  res.send('contact made from server carousel');
  apiProxy.web(req, res, {target: serverCarousel});
});

app.all('/itemImage', (req, res) => {

  res.send('contact made from server itemImage');
  apiProxy.web(req, res, {target: serverItemImage});
});

app.all('/reviews', (req, res) => {

  res.send('contact made from server reviews');
  apiProxy.web(req, res, {target: serverReviews});
});

app.listen(PORT, () => {

  console.log('Listening for request for all services')
});