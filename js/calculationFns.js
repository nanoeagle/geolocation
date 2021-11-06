function distanceInKmToNewCoords(myNewCoords) {
    return computeDistanceInKm(myPreviousCoords, myNewCoords);
}

function computeDistanceInKm(startCoords, destCoords) {
    var startLatRads = convertToRadiansFrom(startCoords.latitude);
    var startLongRads = convertToRadiansFrom(startCoords.longitude);
    var destLatRads = convertToRadiansFrom(destCoords.latitude);
    var destLongRads = convertToRadiansFrom(destCoords.longitude);
    var distance = 
        Math.acos(
            Math.sin(startLatRads) * Math.sin(destLatRads) +
            Math.cos(startLatRads) * Math.cos(destLatRads) *
            Math.cos(startLongRads - destLongRads)
        ) * EARTH_RADIUS_IN_KM;
    return distance;
}

function convertToRadiansFrom(degrees) {
    return (degrees * Math.PI) / 180;
}