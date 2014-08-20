var http = require("http");

http.get("http://www.reddit.com/subreddits/popular.json?limit=5", function(res) {
  console.log("Got response: " + res.statusCode);
  console.log("-------------------------------");
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });

}).on('error', function(e) {
  console.log("Got error: " + e.message);
});