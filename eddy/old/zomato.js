var apiKey = "07c96acb311a7724aee5d8fc4c83cd8f";
var test = {};

function search() {
    var search = $("#search-input").val();

    var queryURL = `https://developers.zomato.com/api/v2.1/search?entity_id=austin&entity_type=city&q=${search}`;
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
