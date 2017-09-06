var express = require("express");
var app     = express();
var path    = require("path");

app.set('views', __dirname + '/views')
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
    res.sendFile(path.join(__dirname+'/public/style.css'));
  //__dirname : It will resolve to your project folder.
});

app.listen(3000);


console.log("Running at Port 3000");