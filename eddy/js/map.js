var userSelection = "restaurant";

var map;
var infowindow;

var request;
var service;
var markers = [];

var lat = 0;
var lng = 0;

var address;
var address1;
var address2;
var address3;

var index = 1;


var addressArray = [];
var numberOfWaypoints = 3;

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
    address = place.vicinity;
    infowindow.setContent(place.name + "<br>" + place.vicinity + "<br><button onclick='nextWaypoint()' attr=" + address + ">Select me!<button>");
    
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


for (var i=0; i < numberOfWaypoints; i++) {
  
}


// Choose next waypoint
function nextWaypoint() {

  if (index === 1) {
    addressArray[0] = address;
    console.log(addressArray);
    $("#saved-stuff").append("<p>First destination: " + address + "</p>");
    alert("Click another category!");
  } else if (index === 2) {
    addressArray[1] = address;
    console.log(addressArray);
    $("#saved-stuff").append("<p>Second destination: " + address + "</p>");
    alert("Click another category!");
  } else if (index === 3) {
    addressArray[2] = address;
    console.log(addressArray);
    $("#saved-stuff").append("<p>Third destination: " + address + "</p>");
    alert("Click another category!");
  };

  // else if index=4, get route
  index++;

};


// Search for what?
$(document).on("click", "button", function (event) {
  event.preventDefault();
  userSelection = $(this).val();
  $("#query").text(userSelection);
  console.log("User selected: " + userSelection);
  clearResults();
  initialize(userSelection);
});
