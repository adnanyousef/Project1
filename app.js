(function($){
    $(function(){
  
      $('.sidenav').sidenav();
      $('.parallax').parallax();
  
    }); 
  })(jQuery); 
  
  //----Eddy finder---

  var userSelection = "restaurant";
  var map;
  var infowindow;
  var request;
  var service;
  var markers = [];
  function initialize(searchCategory) {
    var center = new google.maps.LatLng(30.2918043, -97.7909014);
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
    google.maps.event.addListener(map, 'rightclick', function(event){
      map.setCenter(event.latLng);
      clearResults(markers);
      var request = {
        location: event.latLng,
        radius: 8047,
        types: [searchCategory]
      };
      service.nearbySearch(request, callback);
    })
  };
  function callback(results,status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i=0; i < results.length; i++) {
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
    google.maps.event.addListener(marker, 'click', function() {
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
  google.maps.event.addDomListener(window, 'load', function() {
    initialize(userSelection);
  });
  
  // Search for what?
  $(document).on("click", "button", function(event){
    event.preventDefault();
    userSelection = $(this).val();
    console.log("User selected: " + userSelection);
    clearResults();
    initialize(userSelection);
  });

  // drop down search 
  $('.dropdown-trigger').dropdown();

  
        
