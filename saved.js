var pastNames = JSON.parse(localStorage.getItem("past_names"));
var pastAddresses = JSON.parse(localStorage.getItem("past_addresses"));
var pastUrls = JSON.parse(localStorage.getitem("past_urls"));



function renderBoxes() {
    for (var i=0; i < pastNames.length; i++) {
        var newDiv = $("<div class='saved-item' id='" + i + "'>");
        
        var html = 
            `<p>Past trip:</p>` +
            `<p>${pastNames[i]}</p>` +
            `<p>`


        newDiv.html(html);
        $("#divs-go-here").append(newDiv);
    };
};

renderBoxes();
