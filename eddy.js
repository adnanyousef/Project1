var apiKey = "07c96acb311a7724aee5d8fc4c83cd8f";
var data = {};

function search() {
    var search = $("#search-input").val();
    var location = $("#location-input").val();
    var queryURL = `https://api.yelp.com/v3/businesses/search?term=${search}&location=${location}`;
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            Authorization: "Bearer" apiKey
        }
    }).then(function (response) {
        console.log(response);
        data = response;
    });
};

$(document).on("click", "#submit-button", search);
