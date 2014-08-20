var express = require('express');
var bodyParser = require('body-parser');

var articlesAdapter = require('./app/adapters/articlesAdapter.js');
var projectsAdapter = require('./app/adapters/projectsAdapter.js');

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


//POST -> create a speedy project
app.post('/projects', function(req,res) {
  var postParams = req.body;
  projectsAdapter.create(postParams,function(err,project){
    if(err) {
      res.send(500,{
        error: 'Something went wrong'
      });
    } else {
      res.send(200,project);
    }
  });
});
//GET -> check status of a project
app.get('/projects/:id', function(req,res) {

  var projectId = req.params.id.toString();

  console.log("SIMON2: "+JSON.stringify(projectId));

  projectsAdapter.detail(projectId,function(err,project){
    if(err) {
      res.send(500,{
        error: 'Something went wrong'
      });
    } else {
      res.send(200,project);
    }
  });
});


// Serve static files
app.use(express.static(__dirname + '/public'));


//Init app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening in port '+port);