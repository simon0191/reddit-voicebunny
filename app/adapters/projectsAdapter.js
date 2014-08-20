var config = require('../config.js');
var requestify = require('requestify');


var projectsAdapter = (function() {

  return {
    create : function(postParams,callback) {
      var postData = {
        title: postParams.title,
        script: postParams.script
      };
      if(postParams.test == '1') {
        postData.test = '1';
      }

      requestify.request('https://api.voicebunny.com/projects/addSpeedy.json', {
          method: 'POST',
          body: postData,
          auth: {
              username: config.VOICE_BUNNY_USER_ID,
              password: config.VOICE_BUNNY_API_TOKEN
          },
          dataType: 'json'

      }).then(function(response) {

        callback(null,response.getBody());
      }).fail(function(err) {
        callback(err);
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
      }).fail(function(err) {
        callback(err);
      });
    }

  };

})();

module.exports = exports = projectsAdapter;