var userSelection = "restaurant";

var map;
var infowindow;

var request;
var service;
var markers = [];

var lat = 0;
var lng = 0;

var radius = 8047 // in meters

// Get current location
navigator.geolocation.getCurrentPosition(function(position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;
});

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
  console.log(searchCategory)
  infowindow = new google.maps.InfoWindow();

  service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, callback);

  google.maps.event.addListener(map, 'rightclick', function (event) {
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
    infowindow.setContent(place.name);
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



// Search for what?
$(document).on("click", "button", function (event) {
  event.preventDefault();
  userSelection = $(this).val();
  $("#query").text(userSelection);
  console.log("User selected: " + userSelection);
  clearResults();
  initialize(userSelection);
});
