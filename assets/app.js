//---layout display--- 
(function ($) {
  $(function () {

    $('.sidenav').sidenav();
    $('.parallax').parallax();

  });
})(jQuery);

//------drop down selection--------
$(".dropdown-trigger").dropdown();


//--------search scroll animation-------
$(document).ready(function () {
  $("#searchButton").on('click', function (event) {
    event.preventDefault()
    var hash = this.hash;

    if ($(hash).offset()) {
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {});
    };
  });
});

//-------collapsible-------
$(document).ready(function () {
  $('.collapsible').collapsible();
});


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


var x = window.matchMedia("(max-width: 800px)"); // change google infobox html media query 
var defineHtml;

// Get current location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    console.log("Got user location: " + lat + ", " + lng);
    initialize(userSelection);
  }, function () {
    // User doesn't want to share current location
    userLocation = $("#location-input").val();
    // Hardcode to ATX for now
    lat = 30.26715;
    lng = -97.74306;
    console.log("User denies location access. Hardcoding to ATX for now...");
    initialize(userSelection);
  });
} else {
  // Browser doesn't support GeoLocation
  userLocation = $("#location-input").val();
  // Hardcode to ATX for now
  lat = 30.26715;
  lng = -97.74306;
  initialize(userSelection);
  console.log("Browser doesn't support location services... Tell user to upgrade!");
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
      var stop = "First";
    } else if (index == 1) {
      var stop = "Second";
    } else if (index == 2) {
      var stop = "Third";
    } else {
      var stop = "Next";
    };

    defineHtml = function(x) {
      if (x.matches) { // If media query matches
          return `<center><div style="overflow: auto;"><strong style="font-size: 1.5rem;">${name}</strong><br><hr>` +
          `${address}<br>` +
          `<button class="user-choice" onclick='nextWaypoint(); alertToast()'>Select ${stop} Stop</button></div></center>`;
      } else {
          return `<center><div style="overflow: auto;"><strong style="font-size: 1.5rem;">${name}</strong><br><hr>` +
          `${address}<br>` +
          `Price: ${price}<br>` +
          `Rating: ${rating}<br>` +
          `<img style="width: 45%"src="${photo}"><br>` +
          `<button class="user-choice" onclick='nextWaypoint(); alertToast()'>Select ${stop} Stop</button></div></center>`;
      }
    }

    var html = defineHtml(x);
    
    infowindow.setContent(html);

    console.log(address);
    infowindow.open(map, this);
  });
  return marker;
};




function clearResults(markers) {
  for (var m in markers) {
    markers[m].setMap(null);
  };
  markers = [];
};

google.maps.event.addDomListener(window, 'load', function () {
  initialize(userSelection);
});

//alert selection was made
function alertToast() {
  if (index === 1) {
    var dest = "First";
  } else if (index === 2) {
    var dest = "Second";
  } else if (index === 3) {
    var dest = "Third";
  } else {
    var dest = "Next";
  };
  M.toast({
    html: dest + ' Destination Selected'
  })
}

// Choose next waypoint
function nextWaypoint() {

  if (index === 0) {
    // addressArray[0] = address;
    getAttributes();
    $("#saved-stuff1").attr("class", "results").append(name + "<br>" + "<hr align='left'>" + address + "<br>");
    console.log("Chose first destination: " + nameArray[index]);
  } else if (index === 1) {
    // addressArray[1] = address;
    getAttributes();
    $("#saved-stuff2").attr("class", "results").append(name + "<br>" + "<hr align='left'>" + address + "<br>");
    console.log("Chose second destination: " + nameArray[index]);
  } else if (index === 2) {
    // addressArray[2] = address;
    getAttributes();
    $("#saved-stuff3").attr("class", "results").append(name + "<br>" + "<hr align='left'>" + address + "<br>");
    console.log("Chose third destination: " + nameArray[index]);
    $("#route-link").fadeIn("slow");
    runRoute();
  };
  index++;

  var newUndoButton = $(`<button id='undo-button' number='${index}'><i class="fas fa-undo-alt"></i>   <span class="underline-on-hover">Undo</span></button>`);
  $("#undo").html(newUndoButton);
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
  clearResults();
  initialize(userSelection);
});


function runRoute() {
  var pseudostart = nameArray[0].replace(/ /g, "+") + "+" + addressArray[0].replace(/ /g, "+");
  var pseudoend = nameArray[2].replace(/ /g, "+") + "+" + addressArray[2].replace(/ /g, "+");
  var pseudowaypoint = nameArray[1].replace(/ /g, "+") + "+" + addressArray[1].replace(/ /g, "+");

  var routeURL = "https://www.google.com/maps/dir/?api=1&" + "+Austin+TX&destination=" + pseudoend + "+Austin+TX&waypoints=" + pseudowaypoint + "%7C" + pseudostart;
  console.log(routeURL);
  console.log("--------")
  document.getElementById("open-route-link").setAttribute("href", routeURL);
  console.log($("#open-route-link"));

};

// Undo function
$(document).on('click', '#undo-button', function (event) {
  event.preventDefault();
  var number = parseInt($(this).attr('number'));
  console.log("Clicked undo button " + number);
  addressArray.splice(number - 1, 1);
  nameArray.splice(number - 1, 1);
  idArray.splice(number - 1, 1);
  websiteArray.splice(number - 1, 1);
  priceArray.splice(number - 1, 1);
  ratingArray.splice(number - 1, 1);
  photosArray.splice(number - 1, 1);
  $("#saved-stuff" + number).empty();
  index--;
  $("#undo-button").attr("number", index);
});

// On click search, update map with user input
$(document).on("click", "#searchButton", function (event) {
  event.preventDefault();
  var autocompletePlace = autocomplete.getPlace();
  lat = autocompletePlace.geometry.location.lat();
  lng = autocompletePlace.geometry.location.lng();
  console.log("Searched for " + lat + ", " + lng);
  initialize(userSelection);
});

// change return html google infobox based on screen width
x.addListener(defineHtml);
