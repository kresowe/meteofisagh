$(document).ready(function(){
    var meteoData = {stations: {}};

    $.getJSON('http://mech.fis.agh.edu.pl/meteo/rest/json/info/', function(result) {
       meteoData.stations = result;

    });

    initializeMap(meteoData.stations);



    function initializeMap(result) {
        var myCenter = new google.maps.LatLng(50.066855, 19.91309);
        var mapProp = {
            center: myCenter,
            zoom: 9,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        var mapDiv = document.getElementById('googleMap');
        var map = new google.maps.Map(mapDiv, mapProp);

        setMarkers(map, result);
    }

    function setMarkers(map, result) {
        for (var i = 0; i < result.length; i++) {
            var coords = new google.maps.LatLng(result[i].lati, result[i].long);
            var stationName = result[i].name;
            var stationId = result[i].station;

            var marker = new google.maps.Marker({
                position: coords,
                map: map,
                title: stationName
            });

            var content = '<div class="mapInfoText"><h5>' + stationName + '</h5>';
            content += '<p><a href="/station/' + stationId + '/">Zobacz pogodę w stacji</a></p>';
            content += '</div>';
            var infoWindow = new google.maps.InfoWindow();

            google.maps.event.addListener(marker, 'click',
                function(marker, content, infoWindow) {
                    return function() {
                        infoWindow.setContent(content);
                        infoWindow.open(map, marker);
                    };
            }(marker, content, infoWindow));
        }
    }

});