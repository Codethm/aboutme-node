const express=require('express');
const https = require('https');
const fs = require('fs');

const httpsOptions = {
    ca: fs.readFileSync(__dirname + '/ssl/codethm_me.ca-bundle'),
    key: fs.readFileSync(__dirname + '/ssl/codethm.me.key'),
    cert: fs.readFileSync(__dirname + '/ssl/codethm_me.crt')
}

var app=express();
app.use(express.static(__dirname));

app.all('*', ensureSecure);
function ensureSecure(req, res, next){
    if(req.secure){
      // OK, continue
      return next();
    };
    res.redirect('https://' + req.hostname + req.url);
  }

app.get('/',function(req,res){
    res.sendfile(__dirname + '/home.html');
})

app.listen(80, function(){
    console.log("HTTP is listening to port 80.");
})

https.createServer(httpsOptions, app).listen(443,function(){
    console.log("HTTPS is listening to port 443.");
})