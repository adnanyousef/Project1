var weatherInfoDiv = $("#weatherInfo");
weatherInfoDiv.text("Getting local weather...");

var apiKey = "f910817faa30cb7e21fa85cfecb50202";

function updateWeather() {
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        var weatherData = {
            name: response.name,
            temp: Math.floor((response.main.temp - 273.15)*1.8+32),
            description: response.weather[0].main,
            icon: `http://openweathermap.org/img/w/${response.weather[0].icon}.png`,
            humidity: response.main.humidity,
        };

        var html = 
            `<center>Current weather in <strong>${weatherData.name}</strong>:<br>` +
            `<p>Temp: ${weatherData.temp}°F | Humidity: ${weatherData.humidity}</p>` +
            `<em>${weatherData.description}</em><br>` +
            `<img style= "width: 35%;" src="${weatherData.icon}"></center>`

        weatherInfoDiv.html(html);
    });
};

updateWeather();
