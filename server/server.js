const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8008;
const httpProxy = require('http-proxy');

const apiProxy = httpProxy.createProxyServer();

const serverSearchbar = 'http://searchbarricardo2-dev.us-east-2.elasticbeanstalk.com/',
      serverItemImage = 'http://imagecomponent-env-1.eba-4mfwjdhg.us-east-2.elasticbeanstalk.com',
      serverCarousel = 'http://newcarousel-env.eba-irp2rurw.us-east-2.elasticbeanstalk.com/',
      serverReviews = 'http://111111-env.eba-9uquamkj.us-east-2.elasticbeanstalk.com/'

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json())

app.all('/api/get/products', (req, res) => {

  apiProxy.web(req, res, {target: serverSearchbar});
  res.send('contact made from server searchBar');

});

app.all('/products', (req, res) => {
  console.log('made contact with carousel');
  apiProxy.web(req, res, {target: serverCarousel});
  res.send('contact made from server carousel');
});

app.all('/display', (req, res) => {

  apiProxy.web(req, res, {target: serverItemImage});
  res.send('contact made from server itemImage');
});

app.all('/api/getReviews', (req, res) => {

  apiProxy.web(req, res, {target: serverReviews});
  res.send('contact made from server reviews');
});

app.listen(PORT, () => {

  console.log(`Listening for request for all services at port: ${PORT}`);
});