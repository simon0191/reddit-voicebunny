var requestify = require('requestify');

var articlesAdapter = (function() {
  return {
    getTrendy: function(callback) {

      requestify.get('http://www.reddit.com/r/funny/hot.json?limit=1').then(function(response) {
          // Get the response body
          var title = response.getBody().data.children[0].data.title;
          var url = response.getBody().data.children[0].data.url;

          console.log("Title: "+title);
          console.log("URL: "+url);
          callback(null,{
            title: title,
            url: url
          });

      });
    }
  };

})();

module.exports = exports = articlesAdapter;