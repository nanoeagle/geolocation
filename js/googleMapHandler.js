function showGoogleMap(myCoords) {
    var latLong = new google.maps.LatLng(myCoords.latitude, myCoords.longitude);
    map = createGoogleMap(latLong);
    handleGoogleMapMarker(myCoords, latLong);
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

function scrollGoogleMapToPosition(myCoords) {
    var latLong = new google.maps.LatLng(myCoords.latitude, myCoords.longitude);
    map.panTo(latLong);
    handleGoogleMapMarker(myCoords, latLong);
}

function handleGoogleMapMarker(myCoords, latLong) {
    var marker = createGoogleMapMarker(latLong);
    var infoWindow = createGoogleMapInfoWindow(myCoords, latLong);
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

function createGoogleMapInfoWindow(myCoords, latLong) {
    var content = 
        "You are here: " + myCoords.latitude + ", " + myCoords.longitude;
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