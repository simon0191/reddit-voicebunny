$(document).ready(function(){

  //Find article
  $('#find-article').on('click',function() {
    $.getJSON('/articles/trendy',function(article) {
      //Article
      $('#article-title').text(article.title);
      $('#article-content').text(article.url);

      //Form
      $('#title').val(article.title);

    })
  });


  //Create Speedy
  $('#create-vb-speedy').on('click',function(event) {
    event.preventDefault();

    var formFields = ['title','language','gender-and-age','lifetime','remarks','ping','price'];
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

    $.post('/projects', postData, function(data) {
      console.log(data);
    }, "json");
  });

});