var express = require('express'),
argon2i = require('argon2-ffi').argon2i,
crypto = require('crypto'),
bodyParser = require('body-parser');
var app = express();
var jsonParser = bodyParser.json(); 

app.post('/signup', jsonParser, function(req, res) { 
    if(!req.body) return res.sendStatus(400); 
   
    crypto.randomBytes(32, function(err, salt) { 
      if(err) throw err; 
   
      argon2i.hash(req.body.password, salt).then(hash => { 
        console.log(hash); res.sendStatus(201); 
      }); 
    }); 
  });

app.listen(3000, () => console.log('Server running on port 3000!'));