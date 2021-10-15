var watchId = null;
var wantToSeeMap = true;
var map = null;
var mapProvider = null;
var vanLangUniversityPosition = {
    name: "Van Lang University",
    coords: {
        latitude: 10.8271789,
        longitude: 106.6989877
    }
};

getMyLocation();

function getMyLocation() {
    var geoLoc = navigator.geolocation;
    if (geoLoc) {
        var watchButton = document.getElementById("watch");
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById("clearWatch");
        clearWatchButton.onclick = clearWatch;
    } else {
        alert("Oops, no geolocation support");
    }
}

function watchLocation() {
    watchId = navigator.geolocation.watchPosition(
        processPosition,
        processError, 
        {enableHighAccuracy: true, timeout: 5000}
    );
}

function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

function processPosition(myPosition) {
    var latitude = myPosition.coords.latitude;
    var longitude = myPosition.coords.longitude;
    var accuracy = myPosition.coords.accuracy;
    var myPositionMessage = 
        "You are at Latitude: " + latitude + ", Longitude: " + longitude +
        " (with " + accuracy + " meters accuracy)";
    
    displayMessage(myPositionMessage);
    displayDistance(myPosition, vanLangUniversityPosition);
    handleMap(latitude, longitude);
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

function handleMap(latitude, longitude) {
    if (wantToSeeMap && !mapIsExisting()) {
        mapProvider = getMapProvider();
        if (mapProvider) {
            showMapBy(mapProvider, latitude, longitude);
        } else {
            wantToSeeMap = false;
        }
    } else if (wantToSeeMap && mapIsExisting()) {
        scrollMapToPosition(latitude, longitude);
    }
}

function mapIsExisting() {
    return map !== null;
}

function getMapProvider() {
    var mapProvider;
    do {
        mapProvider = askForMapProvider();
    } while (mapProvider !== null && !providerIsCorrect(mapProvider));
    return mapProvider;
}

function askForMapProvider() {
    mapProvider = prompt(
        "Which map provider would your prefer?", 
        "'google map' or 'open map' (Please type precisely!)"
    );
    if (mapProvider === null) return null;
    return mapProvider.toLowerCase();
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

function scrollMapToPosition(latitude, longitude) {
    switch (mapProvider) {
        case "google map":
            scrollGoogleMapToPosition(latitude, longitude);
            break;
        case "open map":
            scrollOpenMapToPosition(longitude, latitude);
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
    errorMessage += getMoreInfoIfErrorIsNotClear(error);
    displayMessage(errorMessage);
}

function getMoreInfoIfErrorIsNotClear(error) {
    if (error.code === 0 || error.code === 2) 
        return error.message;
    return "";
}

function displayMessage(message) {
    var locationDiv = document.getElementById("location");
    locationDiv.innerHTML = message;
}