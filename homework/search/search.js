$('#query').keyup(function(){
  // All code will be inside of this block


var value = $('#query').val();

var rExp = new RegExp(value, "i");

$.getJSON("https://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function(data) {
  
        var output = '<ol>';
    $.each(data.RESULTS, function(key, val) {
      if (val.name.search(rExp) != -1) {
        output += '<li>';
        output += '<a href="https://www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
        output += '</li>';
      }
   
     console.log(data);
    
  }); 
     output += '</ol>';
    $("#searchResults").html(output);
});// end getJSON
    }); // end keyup