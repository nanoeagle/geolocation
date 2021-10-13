function showGoogleMap(latitude, longitude) {
    var latLong = new google.maps.LatLng(latitude, longitude);
    var map = createGoogleMap(latLong);
    var marker = createGoogleMapMarker(map, latLong);
    var infoWindow = createGoogleMapInfoWindow(latitude, longitude, latLong);
    addGoogleMapMarkerListener(map, marker, infoWindow);
}

function createGoogleMap(latLong) {
    var mapOptions = {
        zoom: 20,
        center: latLong,
        mapTypeId: 'satellite'
    };
    var mapDiv = document.getElementById("map");
    return new google.maps.Map(mapDiv, mapOptions);
}

function createGoogleMapMarker(map, latLong) {
    var title = "Your Location";
    var markerOptions = {
        map: map,
        position: latLong,
        title: title,
        clickable: true
    };
    return new google.maps.Marker(markerOptions);
}

function createGoogleMapInfoWindow(latitude, longitude, latLong) {
    var content = "You are here: " + latitude + ", " + longitude;
    var infoWindowOptions = {
        content: content,
        position: latLong
    };
    return new google.maps.InfoWindow(infoWindowOptions);
}

function addGoogleMapMarkerListener(map, marker, infoWindow) {
    google.maps.event.addListener(marker, "click", function() {
        infoWindow.open(map);
    });
}