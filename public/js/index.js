$(document).ready(function(){

  //Find article
  $('#find-article').on('click',function() {
    $.getJSON('/articles/trendy',function(article) {
      //Article
      $('#article-title').text(article.title);
      $('#article-content').text(article.url);

      //Form
      $('#title').val(article.title);
      $('#script').val(article.title);

    })
  });


  //Create Speedy
  $('#create-vb-speedy').on('click',function(event) {
    event.preventDefault();
    if(validateForm()) {
      var postData = getPostData();

      $.post('/projects', postData, function(data) {
        console.log(data);
        var project = data.project;
        showProjectInfo(project);
      }, "json");
    }
  });

  //Check project status
  $('#check-status-btn').on('click',function(event){
    event.preventDefault();

    var projectId = $('#check-status-id').val();
    $.getJSON('/projects/'+projectId, function(project) {
        console.log(project);
        showProjectInfo(project);
      });
  });




  // Helper methods
  function validateForm() {
    var requiredFormFields = ['title','script'];
    var invalid = false;
    _.each(requiredFormFields,function(field) {
      var elem = $('#'+field);
      if(elem.length > 0) {
        var val = elem.val();
        if(!val) {
          invalid = true;
        }
      }
    });
    if(invalid) {
      $('#error-modal').modal('show');
      return false;
    } else {
      return true;
    }
  }

  function getPostData() {
    var formFields = ['title','script','language','gender-and-age','lifetime','remarks','ping','price'];
    var postData = {};
    _.each(formFields,function(field) {
      var elem = $('#'+field);
      if(elem.length > 0) {
        var val = elem.val();
        if(val) {
          postData[$.camelCase(field)] = val;
        }
      }
    });

    return postData;
  }

  function showProjectInfo(project){
    var links = _.map(project.reads[0].urls,function(url,name) {
      return $('<a/>',{
        href:url.default,
        text: name
      });
    });
    $('#links-container').html(links);
    $('#project-id').text(project.id);
    $('#notification-modal').modal('show');
  }
});
