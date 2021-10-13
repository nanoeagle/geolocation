getMyLocation();

function getMyLocation() {
    var geoLoc = navigator.geolocation;
    if (geoLoc) {
        geoLoc.getCurrentPosition(processPosition, processError);
    } else {
        alert("Oops, no geolocation support");
    }
}

function processPosition(myPosition) {
    var latitude = myPosition.coords.latitude;
    var longitude = myPosition.coords.longitude;
    var vanLangUniversityPosition = {
        name: "Van Lang University",
        coords: {
            latitude: 10.8271789,
            longitude: 106.6989877
        }
    };
    displayMyPosition(latitude, longitude);
    displayDistance(myPosition, vanLangUniversityPosition);
    
    var mapProvider = askForMapProvider();
    showMapBy(mapProvider, latitude, longitude);
}

function displayMyPosition(latitude, longitude) {
    var div = document.getElementById("location");
    div.innerHTML = 
        "You are at Latitude: " + latitude + ", Longitude: " + longitude;
}

function displayDistance(myPosition, destination) {
    var distance = computeDistance(myPosition.coords, destination.coords);
    var distanceDiv = document.getElementById("distance");
    distanceDiv.innerHTML = "You are " + distance 
        + (distance === 1 ? " km" : " kms") + " from " + destination.name;
}

function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);
    var Radius = 6371; // radius of the Earth in km
    var distance = 
        Math.acos(
            Math.sin(startLatRads) * Math.sin(destLatRads) +
            Math.cos(startLatRads) * Math.cos(destLatRads) *
            Math.cos(startLongRads - destLongRads)
        ) * Radius;
    return distance;
}

function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI)/180;
    return radians;
}

function askForMapProvider() {
    var mapProvider;
    do {
        mapProvider = prompt(
            "Which map provider would your prefer?", 
            "'google map' or 'open map' (Please type precisely!)"
        );
        if (mapProvider === null) continue;
        mapProvider = mapProvider.toLowerCase();
    } while ( !providerIsCorrect(mapProvider) );
    
    return mapProvider;
}

function providerIsCorrect(mapProvider) {
    return mapProvider === "google map" || mapProvider === "open map";
}

function showMapBy(mapProvider, latitude, longitude) {
    switch (mapProvider) {
        case "google map":
            showGoogleMap(latitude, longitude);
            break;
        case "open map":
            showOpenMap(longitude, latitude);
    }
}

function processError(error) {
    var errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };

    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }

    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}