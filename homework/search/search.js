$('#query').keyup(function(){
  // All code will be inside of this block
}); // end keyup

var value = $('#query').val();

var rExp = new RegExp(value, "i");

$.getJSON("http://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
  
        var output = '<ol>';
    $.each(data.RESULTS, function(key, val) {
      if (val.name.search(rExp) != -1) {
        output += '<li>';
        output += '<a href="http://www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
        output += '</li>';
      }
    
     console.log(data);
    
  }); 
});// end getJSON