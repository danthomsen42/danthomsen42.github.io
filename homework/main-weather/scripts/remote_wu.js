// Current Location Scripts
$(function () {

  var status = $('#status');

  (function getGeoLocation() {
    status.text('Getting Location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        // Call the getData function, send the lat and long
        getData(lat, long);

      });
    } else {
      status.text("Your browser doesn't support Geolocation or it is not enabled!");
    }

  })();

  // Get the data from the wunderground API
  function getData(lat, long){
    $.ajax({ 

url : "https://api.wunderground.com/api/466cf68244b75172/geolookup/conditions/q/" + lat + "," + long + ".json",
  dataType : "jsonp",
  success : function(data) {
      console.log(lat, long)
      var temp_f = Math.round(data.current_observation.temp_f);
      $("#cityDisplay").text(data.location.city + ", " + data.location.state);
      $("#currentTemp").text(temp_f + "º");
      $("#summary").text(data.current_observation.weather);
      $("#add1").text("Wind Speed: " + data.current_observation.wind_mph + " mph");
      $("#add2").text("Feels Like: " + data.current_observation.feelslike_f + "º");
      $("#add3").text("Relative Humidity: " + data.current_observation.relative_humidity);
      $("#cover").fadeOut(250);
//  var location = parsed_json['location']['city'];

//  alert("Current temperature in " + location + " is: " + temp_f);
  }



        


      //$("#cover").fadeOut(250);
   // }
           });

  }


  // A function for changing a string to TitleCase
  function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
});
