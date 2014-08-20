var config = require('../config.js');
var requestify = require('requestify');


var projectsAdapter = (function() {

  return {
    create : function(postParams,callback) {
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
    },
    detail: function(projectId,callback) {
      requestify.request('https://api.voicebunny.com/projects/'+projectId, {
        method: 'GET',
        auth: {
            username: config.VOICE_BUNNY_USER_ID,
            password: config.VOICE_BUNNY_API_TOKEN
        },
        dataType: 'json'

      }).then(function(response) {
        var body = response.getBody();
        callback(null,body.projects[0]);
      });
    }

  };

})();

module.exports = exports = projectsAdapter;