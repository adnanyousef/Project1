var apiKey = "AIzaSyDeXMSNP-ICspqucRDK8pgiJlNInjVJmio";

function search() {
    var search = $("#search-input").val();

    // var queryURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${apiKey}&input=${search}&inputtype=textquery`;
    var queryURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "user-key": apiKey
        }
    }).then(function(response){
        console.log(response)
        test = response;
    });
};

$(document).on("click", "#search-button", search);
