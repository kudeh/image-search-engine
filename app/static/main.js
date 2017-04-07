// ----- custom js ----- //


// global
var url = '/static/images/';
var data = [];
var image;


$(document).ready(function(){

  console.log("ready");

  $("#error").hide();
  $("#searching").hide();
  $("#no-result").hide();
  $("#result-header").hide();
  $(".evaluation").empty();

  $("#searchButton").click(function(e){

   e.preventDefault();
   e.stopImmediatePropagation();

   $(".result-panel").empty();
   $(".evaluation").empty();
   $("#searching").show();

   var file_name = $("#upload-file")[0].files[0].name;
   console.log(file_name);
   var file_data = $("#upload-file").prop("files")[0];   
   var form_data = new FormData();                  
   form_data.append("file", file_data);
              
   $.ajax({
      url: "/upload",
      dataType: 'image',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,                         
      type: 'POST',
      success: function(data){

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

        // loop through results, append to dom
        $(".img-preview").attr("src", "/static/"+result.preview);

        if(data.length == 0)
           $("#no-result").show();

        var num = parseInt(file_name.substring(0, file_name.indexOf(".")));
        var start = findRange(num);
        var relevant = 0;

        for (i = data.length-1; i > 0; i--) {

          var id = parseInt(data[i]['image'].substring(0, data[i]['image'].indexOf(".")));

          if(id >= start && id <= (start+99)){
              relevant++;
              $(".result-panel").append("<div class='result'><img class='blue-border' src="+url+data[i]["image"]+"/><div class='caption'>"
              +"<p>"+data[i]['image']+": "+data[i]['score']+"</p></div></div>");
          }else{
              $(".result-panel").append("<div class='result'><img class='red-border' src="+url+data[i]["image"]+"/><div class='caption'>"
              +"<p>"+data[i]['image']+": "+data[i]['score']+"</p></div></div>");
          }

          var r = data[i]['image']+","+relevant+","+(100-relevant);
          console.log(r);
          
          //var blob = new Blob

        }

        $("#result-header").show();
        $("#searching").hide();

        $(".evaluation").append("<p> Relevant:"+relevant+"</p>");
        $(".evaluation").append("<p> IRRelevant:"+(100-relevant)+"</p>");

        $(".result").hover(function(){

          $(this).find(".caption").css('display', 'inline');
          $(this).find(".imageID").css('display', 'inline');

        }, function(){

          $(this).find(".caption").css('display', 'none');
          $(this).find(".imageID").css('display', 'none');

        });

        },
      error: function(error){
        console.log("error");
        $("#error").show();
      }


    });

  });

});


function findRange(myId){

   var myRange = 0;

   if(myId >= 0 && myId <= 99){
       myRange = 0;
   }else if(myId >= 100 && myId <= 199){
       myRange = 100;
   }else if(myId >= 200 && myId <= 299){
       myRange = 200;
   }else if(myId >= 300 && myId <= 399){
       myRange = 300;
   }else if(myId >= 400 && myId <= 499){
       myRange = 400;
   }else if(myId >= 500 && myId <= 599){
       myRange = 500;
   }else if(myId >= 600 && myId <= 699){
       myRange = 600;
   }else if(myId >= 700 && myId <= 799){
       myRange = 700;
   }else if(myId >= 800 && myId <= 899){
       myRange = 800;
   }else if(myId >= 900 && myId <= 999){
       myRange = 900;
   }else{
       console.log("NaN");
   }

   console.log("myRange: "+myRange);

   return myRange;

}


function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('.img-preview').attr('src', e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}



