// ----- custom js ----- //


// global
var url = '/static/images/';
var data = [];
var image;


$(document).ready(function(){

  console.log("ready");

 /* $('.fileUpload').click(function(){

    var brand = document.getElementById('logo-id');
    brand.className = 'attachment_upload';
    brand.onchange = function() {
      document.getElementById('fakeUploadLogo').value = this.value.substring(12);
    };

    $("#logo-id").change(function() {
      readURL(this);
      
      var image = brand.value.substring(12);
      console.log(image);
      var form_data = new FormData();                  
      form_data.append('file', file_data);


    });

    /*$.ajax({

      url: "/search",
      data: {}

    });

  });*/

  $("#searchButton").click(function(e){

       e.preventDefault();
       e.stopImmediatePropagation();
       
       var file_name = $("#upload-file")[0].files[0].name;
       console.log(file_name);
       var file_data = $("#upload-file").prop("files")[0];   
       var form_data = new FormData();                  
       form_data.append("file", file_data);
       //alert(form_data);                
       $.ajax({
                url: "/upload",
                dataType: 'image',
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,                         
                type: 'POST',
                success: function(data){
                    //console.log(data); 
                    //var preview = data.preview;
                    //var result = data.results;

                    //alert(data);

                    //$(".img-preview").attr("src", preview);
                },
                error: function(error){
                    console.log(error.toString()); 
                }
      });
      $.ajax({
          url: "/search",
          data: {img: file_name},
          cache: false,
          type: 'POST',

          success: function(result){
            console.log(result);
            var data = result.results;
        // show table
        //$("#results-table").show();
        // loop through results, append to dom
        $(".img-preview").attr("src", "/static/"+result.preview);
        for (i = data.length-1; i > 0; i--) {
          $("#results").append('<tr><th><a href="'+url+data[i]["image"]+'"><img src="'+url+data[i]["image"]+
            '" class="result-img"></a></th><th>'+data[i]['score']+'</th></tr>')
        };
          },
          error: function(error){
            console.log("error");
          }


      });
  });

});

/*$(function() {

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
 
  });

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
}*/

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('.img-preview').attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}



