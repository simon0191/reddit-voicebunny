var requestify = require('requestify');
var _ = require('underscore');

var articlesAdapter = (function() {

  var getSubreddits = function(callback) {
    requestify.get('http://www.reddit.com/subreddits/popular.json?limit=20').then(function(response) {
        // Get the response body
        var listing = response.getBody().data;
        var subreddits = listing.children;
        var result = _.map(subreddits,function(sr){
          return {
            title: sr.data.title,
            url: sr.data.url
          };
        });
        callback(null,result);
    });
  };

  var getTrendy = function(callback) {
    getSubreddits(function(err,subreddits) {
      var sr = subreddits[_.random(0,subreddits.length-1)];
      requestify.get('http://www.reddit.com'+sr.url+'hot.json?limit=1').then(function(response) {
          // Get the response body
          var title = response.getBody().data.children[0].data.title;
          var url = response.getBody().data.children[0].data.url;
          callback(null,{
            title: title,
            url: url
          });

      });
    });
  };

  return {
    getTrendy: getTrendy,
    getSubreddits: getSubreddits

  };

})();

module.exports = exports = articlesAdapter;