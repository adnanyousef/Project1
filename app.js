//---layout display--- 
(function ($) {
  $(function () {

    $('.sidenav').sidenav();
    $('.parallax').parallax();

  });
})(jQuery);

//------drop down selection--------
$(".dropdown-trigger").dropdown();


//--------scroll animation-------
$(document).ready(function () {
  $("a").on('click', function (event) {
    event.preventDefault()
    var hash = this.hash;

    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800, function () {});
  });
});

//-------map functionality---------
var userSelection = "restaurant";

var test = {};

var map;
var infowindow;

var request;
var service;
var markers = [];

var lat = 30.26715;
var lng = -97.74306;
var userLocation = '';

var address
var name;
var id;
var website;
var price;
var rating;
var photos;
var addressArray = [];
var nameArray = [];
var idArray = [];
var websiteArray = []; // Haven't figured out yet
var priceArray = [];
var ratingArray = [];
var photosArray = [];

var numberOfWaypoints = 3;

var index = 0;

var radius = 8047 // in meters


// Get current location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    initialize(userSelection);
  }, function () {
    // User doesn't want to share current location
    userLocation = $("#location-input").val();
    // Hardcode to ATX for now
    lat = 30.26715;
    lng = -97.74306;
  });
} else {
  // Browser doesn't support GeoLocation
  userLocation = $("#location-input").val();
  // Hardcode to ATX for now
  lat = 30.26715;
  lng = -97.74306;
};

function initialize(searchCategory) {
  var center = new google.maps.LatLng(lat, lng);
  map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 13
  });

  request = {
    location: center,
    radius: 8047, // meters, equivalent to 5 miles
    types: [searchCategory]
  };
  infowindow = new google.maps.InfoWindow();

  service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, callback);

  google.maps.event.addListener(markers, 'click', function (event) {
    map.setCenter(event.latLng);
    clearResults(markers);

    var request = {
      location: event.latLng,
      radius: radius,
      types: [searchCategory]
    };
    service.nearbySearch(request, callback);
  })
};



function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      markers.push(createMarker(results[i]));
    };
  };
};

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function () {
    test = place;
    address = place.vicinity;
    name = place.name;
    id = place.id;
    // website = place.website

    // Set price level to font-awesome icons
    if (place.price_level == 1) {
      price = `<i class="fas fa-dollar-sign"></i>`;
    } else if (place.price_level == 2) {
      price = `<i class="fas fa-dollar-sign"></i><i class="fas fa-dollar-sign"></i>`;
    } else if (place.price_level == 3) {
      price = `<i class="fas fa-dollar-sign"></i><i class="fas fa-dollar-sign"></i><i class="fas fa-dollar-sign"></i>`;
    } else if (place.price_level == 4) {
      price = `<i class="fas fa-dollar-sign"></i><i class="fas fa-dollar-sign"></i><i class="fas fa-dollar-sign"></i><i class="fas fa-dollar-sign"></i>`;
    } else if (place.price_level == 5) {
      price = `<i class="fas fa-dollar-sign"></i><i class="fas fa-dollar-sign"></i><i class="fas fa-dollar-sign"></i><i class="fas fa-dollar-sign"></i><i class="fas fa-dollar-sign"></i>`;
    } else {
      price = "N/A";
    };

    // Set ratings to font-awesome icons
    if (place.rating >= 0 && place.rating < 1) {
      rating = `<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`;
    } else if (place.rating >= 1 && place.rating <= 1.5) {
      rating = `<i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`;
    } else if (place.rating > 1.5 && place.rating <= 2) {
      rating = `<i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`;
    } else if (place.rating > 2 && place.rating <= 2.5) {
      rating = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>`;
    } else if (place.rating > 2.5 && place.rating <= 3) {
      rating = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i>`;
    } else if (place.rating > 3 && place.rating <= 3.5) {
      rating = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>`;
    } else if (place.rating > 3.5 && place.rating <= 4) {
      rating = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i>`;
    } else if (place.rating > 4 && place.rating <= 4.4) {
      rating = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>`;
    } else if (place.rating > 4.4 && place.rating < 4.8) {
      rating = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>`;
    } else if (place.rating >= 4.8) {
      rating = `<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>`;
    } else {
      rating = "N/A";
    };

    // Test if a photo not in Google's database, use generic icon
    if (place.photos == undefined) {
      photo = place.icon;
    } else {
      photo = place.photos[0].getUrl({
        'maxWidth': 300,
        'maxHeight': 300
      });
    };

    // Set button text
    if (index == 0) {
      var stop = "first";
    } else if (index == 1) {
      var stop = "second";
    } else if (index == 2) {
      var stop = "third";
    } else {
      var stop = "next";
    };

    var html =
      `<center><div style="overflow: auto;">${name}<br>` +
      `${address}<br>` +
      `Price: ${price}<br>` +
      `Rating: ${rating}<br>` +
      `<img src="${photo}"><br>` +
      `<button onclick='nextWaypoint()'>Select ${stop} stop</button></div></center>`;

    infowindow.setContent(html);

    console.log(address);
    infowindow.open(map, this);
  });
  return marker;
};

function clearResults(markers) {
  for (var m in markers) {
    markers[m].setMap(null);
  }
  markers = [];
}

google.maps.event.addDomListener(window, 'load', function () {
  initialize(userSelection);
});


// Choose next waypoint
function nextWaypoint() {

  if (index === 0) {
    // addressArray[0] = address;
    getAttributes();
    $("#saved-stuff1").append("<p>First destination: " + name + "<br>" + address + "<br>" + "Price: " + price + "<img src='" + photo + "'>" + "</p>");
    console.log("Chose first destination: " + nameArray[index]);
  } else if (index === 1) {
    // addressArray[1] = address;
    getAttributes();
    $("#saved-stuff2").append("<p>Second destination: " + address + "</p>");
    console.log("Chose second destination: " + nameArray[index]);
  } else if (index === 2) {
    // addressArray[2] = address;
    getAttributes();
    $("#saved-stuff3").append("<p>Third destination: " + address + "</p>");
    console.log("Chose third destination: " + nameArray[index]);
    // GET ROUTE
  };
  // else if index=3, get route
  index++;
};


function getAttributes() {
  addressArray[index] = address;
  nameArray[index] = name;
  idArray[index] = id;
  websiteArray[index] = website;
  priceArray[index] = price;
  ratingArray[index] = rating;
  photosArray[index] = photo;
};


// Click on category buttons
$(document).on("click", "button", function (event) {
  event.preventDefault();
  userSelection = $(this).val();
  $("#query").text(userSelection);
  console.log("User selected: " + userSelection);
  clearResults();
  initialize(userSelection);
});


console.log(lat, lng)
// selected trips section
// $("#saved-stuff").hide()