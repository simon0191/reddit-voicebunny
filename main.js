var express = require('express');
var bodyParser = require('body-parser');
var articlesAdapter = require('./app/adapters/articlesAdapter.js');

var app = express();

// Serve API
app.use(bodyParser());

//GET -> get a trendy article
app.get('/articles/trendy', function(req,res) {

  articlesAdapter.getTrendy(function(err,article){
    if(err) {
      res.send(500,{
        error: 'Something went wrong'
      });
    } else {
      res.send(200,article);
    }

  });

});


// Serve static files
app.use(express.static(__dirname + '/public'));


//Init app
var port = 3000;
app.listen(process.env.PORT || port);
console.log('Listening in port '+port);