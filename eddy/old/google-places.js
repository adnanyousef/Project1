var apiKey = "AIzaSyDeXMSNP-ICspqucRDK8pgiJlNInjVJmio";

var search = $("#search-input").val();

var queryURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mongolian%20grill&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=${apiKey}`;


function initialize() {
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: new google.maps.LatLng(42.444508,-76.499491),
    zoom: 15
  });

  var request = {
    query: "burgers"
  };

  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);

  service.getDetails(request, function(place, status) {
    console.log(status)
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(place)
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
