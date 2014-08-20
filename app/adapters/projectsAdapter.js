var config = require('../config.js');
var requestify = require('requestify');


var projectsAdapter = (function() {

  return {
    create : function(postParams,callback) {
      console.log("inside create: "+JSON.stringify(postParams));
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

      }).then(function(response) {

        callback(null,response.getBody());
      });
    }

  };

})();

module.exports = exports = projectsAdapter;