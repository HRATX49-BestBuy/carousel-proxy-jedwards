const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8008;
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json())

app.all('*',(req,res)=>{

  let endpoint = req.params[0];
  
  if (endpoint === '/api/getReviews'){

    proxy.web(req,res,{target:'http://111111-env.eba-9uquamkj.us-east-2.elasticbeanstalk.com/'})

  } else if (endpoint === '/products') {

    proxy.web(req,res,{target:'http://newcarousel-env.eba-irp2rurw.us-east-2.elasticbeanstalk.com/'})
  
  } else if (endpoint === '/api/get/products'){
    
    proxy.web(req,res,{target:'http://searchbarricardo2-dev.us-east-2.elasticbeanstalk.com/'})
   
  } else if (endpoint === '/display'){
  
    proxy.web(req,res,{target:'http://imagecomponent-env-1.eba-4mfwjdhg.us-east-2.elasticbeanstalk.com/'})
  
  } else {
   
    res.status(400).send(endpoint)
  }
})
app.listen(PORT, () => {

  console.log(`Proxy listening on port ${PORT}`);
})
