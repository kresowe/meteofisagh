$(document).ready(function(){
    var stationId = $('.myInvisible').text();

    $.getJSON('http://mech.fis.agh.edu.pl/meteo/rest/json/info/', function(result) {
        for (var i = 0; i < result.length; i++) {
            if (result[i].station == stationId) {
                $("#stationName").text(result[i].name);
                break;
            }
        }
    });

    $.getJSON('http://mech.fis.agh.edu.pl/meteo/rest/json/last/' + stationId, function(result) {
        $('#time').text(result[0].time);
        $('#ta').text(result[0].data.ta);
    });
});