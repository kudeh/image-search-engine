// ----- custom js ----- //
 
 
// global
var url = '/static/images/';
var data = [];
 
$(function() {
 
  // sanity check
  console.log( "ready!" );
 
  // image click
  $(".search").unbind('click').bind('click', function (e) {

    console.log("searching...");
 
    // ajax request
    /*$.ajax({
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
    });*/
 
  });
 
});
