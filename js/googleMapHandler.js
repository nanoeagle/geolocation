function showGoogleMap(latitude, longitude) {
    var latLong = new google.maps.LatLng(latitude, longitude);
    map = createGoogleMap(latLong);
    handleGoogleMapMarker(latitude, longitude, latLong);
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

function scrollGoogleMapToPosition(latitude, longitude) {
    var latLong = new google.maps.LatLng(latitude, longitude);
    map.panTo(latLong);
    handleGoogleMapMarker(latitude, longitude, latLong);
}

function handleGoogleMapMarker(latitude, longitude, latLong) {
    var marker = createGoogleMapMarker(latLong);
    var infoWindow = createGoogleMapInfoWindow(latitude, longitude, latLong);
    addGoogleMapMarkerListener(marker, infoWindow);
}

function createGoogleMapMarker(latLong) {
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

function addGoogleMapMarkerListener(marker, infoWindow) {
    google.maps.event.addListener(marker, "click", function() {
        infoWindow.open(map);
    });
}