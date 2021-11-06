const MIN_DISTANCE_IN_KM_TO_ADD_NEW_MARKERS = 0.02;
const EARTH_RADIUS_IN_KM = 6371;

var watchButton = document.getElementById("watchBtn");
var isWatching = false;
var watchId = null;

var vanLangUniversityPosition = {
    name: "Van Lang University",
    coords: {
        latitude: 10.8271789,
        longitude: 106.6989877
    }
};
var myPreviousCoords = null;

var wantToSeeMap = true;
var map = null;
var mapProvider = null;

getMyLocation();

function getMyLocation() {
    var geoLoc = navigator.geolocation;
    if (geoLoc) {
        watchButton.onclick = handleWatchButtonClick;
    } else {
        alert("Oops, no geolocation support");
    }
}

function handleWatchButtonClick() {
    if (isWatching) {
        handleClearingWatch();
    } else {
        handleWatching();
    }
}

function handleClearingWatch() {
    clearWatch();
    isWatching = false;
    watchButton.innerHTML = "Watch me";
}

function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

function handleWatching() {
    watchLocation();
    isWatching = true;
    watchButton.innerHTML = "Clear watch"
}

function watchLocation() {
    watchId = navigator.geolocation.watchPosition(
        processPosition,
        processError, 
        {enableHighAccuracy: true, timeout: 5000}
    );
}

function processPosition(myPosition) {
    var myCoords = myPosition.coords;
    var myPositionMessage = 
        "You are at Latitude: " + myCoords.latitude + 
        ", Longitude: " + myCoords.longitude +
        " (with " + myCoords.accuracy + " meters accuracy)";
    
    displayMessage(myPositionMessage);
    displayDistance(myPosition, vanLangUniversityPosition);
    handleMap(myCoords);
}

function displayMessage(message) {
    var locationDiv = document.getElementById("location");
    locationDiv.innerHTML = message;
}

function displayDistance(myPosition, destination) {
    var distance = computeDistanceInKm(myPosition.coords, destination.coords);
    var distanceDiv = document.getElementById("distance");
    distanceDiv.innerHTML = "You are " + distance 
        + (distance === 1 ? " km" : " kms") + " from " 
        + destination.name;
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
    handleClearingWatch();
}

function getMoreInfoIfErrorIsNotClear(error) {
    if (error.code === 0 || error.code === 2) 
        return error.message;
    return "";
}