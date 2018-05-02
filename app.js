var express=require('express');
var app=express();

app.get('/',function(req,res){
    res.sendfile(__dirname + '/home.html');
})

app.listen(80)