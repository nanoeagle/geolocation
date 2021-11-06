function handleMap(myCoords) {
    if (wantToSeeMap && !mapIsExisting()) {
        mapProvider = getMapProvider();
        if (mapProvider) {
            showMapBy(mapProvider, myCoords);
            myPreviousCoords = myCoords;
        } else {
            wantToSeeMap = false;
        }
    } else if (
        wantToSeeMap && 
        distanceInKmToNewCoords(myCoords) > 
            MIN_DISTANCE_IN_KM_TO_ADD_NEW_MARKERS
    ) {
        scrollMapToPosition(myCoords);
        myPreviousCoords = myCoords;
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

function showMapBy(mapProvider, myCoords) {
    switch (mapProvider) {
        case "google map":
            showGoogleMap(myCoords);
            break;
        case "open map":
            showOpenMap(myCoords);
    }
}

function scrollMapToPosition(myCoords) {
    switch (mapProvider) {
        case "google map":
            scrollGoogleMapToPosition(myCoords);
            break;
        case "open map":
            scrollOpenMapToPosition(myCoords);
    }
}