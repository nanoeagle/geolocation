function showOpenMap(myCoords) {
    map = createOpenMap(myCoords);
    handleOpenMapMarker(myCoords);
}

function createOpenMap(myCoords) {
    return new ol.Map({
        target: "map",
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat(
                [myCoords.longitude, myCoords.latitude]
            ),
            zoom: 18
        })
    });
}

function scrollOpenMapToPosition(myCoords) {
    handleOpenMapMarker(myCoords);
}

function handleOpenMapMarker(myCoords) {
    var marker = createOpenMapMarker(myCoords);
    map.addLayer(marker);

    var infoPopup = createOpenMapInfoPopup();
    map.addOverlay(infoPopup);

    var closer = createOpenMapInfoPopupCloser(infoPopup);
    setOpenMapOnclickHandler(map, infoPopup, closer);
}

function createOpenMapMarker(myCoords) {
    return markerLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [
                new ol.Feature({
                    geometry: new ol.geom.Point(
                        ol.proj.fromLonLat(
                            [myCoords.longitude, myCoords.latitude]
                        )
                    )
                })
            ]
        })
    });
}

function createOpenMapInfoPopup() {
    var container = document.getElementById("popup");
    return new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });
}

function createOpenMapInfoPopupCloser(infoPopup) {
    var closer = document.getElementById("popup-closer");
    closer.onclick = function() {
        infoPopup.setPosition(undefined);
        closer.blur();
        return false;
    };
    return closer;
}

function setOpenMapOnclickHandler(map, infoPopup, closer) {
    var content = document.getElementById("popup-content");
    map.on('singleclick', function(event) {
        if (map.hasFeatureAtPixel(event.pixel)) {
            var coordinate = event.coordinate;
            content.innerHTML = "You are here: " + ol.proj.toLonLat(coordinate);
            infoPopup.setPosition(coordinate);
        } else {
            infoPopup.setPosition(undefined);
            closer.blur();
        }
    });
}