$('#query').keyup(function () {
    // All code will be inside of this block


    var value = $('#query').val();

    var rExp = new RegExp(value, "i");

    $.getJSON("https://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {

        var output = '<ol>';
        $.each(data.RESULTS, function (key, val) {
            if (val.name.search(rExp) != -1) {
                output += '<li>';
                output += '<a href="/homework/weather/search.html" title="See results for ' + val.name + '">' + val.name + '</a>';
                //output += val.name;
                output += '</li>';
            }

            //console.log(data);

        });
        $("#page-nav").on("click", "a", function (evt) {
            evt.preventDefault();
            // With the text value get the needed value from the weather.json file
            var jsonCity = $(this).text(); // Franklin, etc...
            console.log(jsonCity);
            $.ajax({
                url: "/homework/menu-activity/scripts/weather.json",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    console.log(data[jsonCity]);
                    var zip = data[jsonCity].zip;
                    console.log(zip);
                    getData(zip);
                }
            });
        });

        output += '</ol>';

        function getData(input) {
            // Get the data from the wunderground API
            $.ajax({
                url: "https://api.wunderground.com/api/466cf68244b75172/forecast/geolookup/conditions/q/" + input + ".json",
                dataType: "jsonp",
                success: function (data) {
                    console.log(data);
                    var location = data.location.city + ', ' + data.location.state;
                    var temp_f = data.current_observation.temp_f;
                    console.log('Location is: ' + location);
                    console.log('Temp is: ' + temp_f);
                    $("#cityDisplay").text(location);
                    $("title").html(location + " | Weather Center");
                    $("#currentTemp").html(Math.round(temp_f) + '°');
                    $("#summary").text(toTitleCase(data.current_observation.icon));
                    $("#cover").fadeOut(250);
                }
            });
        }

        $("#searchResults").html(output);
    }); // end getJSON
}); // end keyup