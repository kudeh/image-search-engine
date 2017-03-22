// ----- custom js ----- //


// global
var url = '/static/images/';
var data = [];

$(function() {

  console.log( "ready!" );

  $('.fileUpload').click(function(){

    var brand = document.getElementById('logo-id');
    brand.className = 'attachment_upload';
    brand.onchange = function() {
      document.getElementById('fakeUploadLogo').value = this.value.substring(12);
    };

    $("#logo-id").change(function() {
      readURL(this);
    });

  });

  // sanity check

  // image click
  /*$(".search").unbind('click').bind('click', function (e) {

    console.log("searching...");
 
    // ajax request
    $.ajax({
      type: "POST",
      url: "/search",
      data : { img : image },
      // handle success
      success: function(result) {
        console.log(result.results);
        var data = result.results;
        
        // loop through results, append to dom
        for (i = 0; i < data.length; i++) {
            
        };
      },
      // handle error
      error: function(error) {
        console.log(error);
        // append to dom
       
      }
    });
 
  });*/

});

 // Source: http://stackoverflow.com/a/4459419/6396981
 function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('.img-preview').attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}



