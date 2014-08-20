var config = require('../config.js');
var requestify = require('requestify');


var projectsAdapter = (function() {

  return {
    create: function(postParams,callback) {

      requestify.request('https://api.voicebunny.com/projects/addSpeedy.json', {
          method: 'POST',
          body: {
            test: '1',
            title: postParams.title,
            script: postParams.script
          },
          auth: {
              username: config.VOICE_BUNNY_USER_ID,
              password: config.VOICE_BUNNY_API_TOKEN
          },
          dataType: 'json'
      })
      .then(function(response) {
          // get the response body
          console.log(response.getBody());

           // get the code
           console.log(response.getCode());

          // get the raw response body
          console.log(response.body);
          callback(null,response.getBody());
      });
    }
  };

})();

module.exports = exports = projectsAdapter;