$(document).ready(function(){
    var stationId = $('.myInvisible').text();

    $.getJSON('http://mech.fis.agh.edu.pl/meteo/rest/json/info/', function(result) {
        for (var i = 0; i < result.length; i++) {
            if (result[i].station == stationId) {
                $("#stationName").text(result[i].name);
                $("#stationAltitude").text(result[i].alti);
                break;
            }
        }
    });

    $.getJSON('http://mech.fis.agh.edu.pl/meteo/rest/json/last/' + stationId, function(result) {
        presentLastDataInTable(result);
        makeTemperatureChart(result);
    });

    function presentLastDataInTable(result) {
        $('#time').text(result[0].utc);
        $('#ta').text(result[0].data.ta);
        $('#p0').text(result[0].data.p0);
        $('#r1').text(result[0].data.r1);
        $('#ws').text(result[0].data.ws);
    }

    function prepareTime(theTime) {
        var dateTime = Date.UTC(
            theTime.slice(0, 4), //year
            theTime.slice(5, 7) - 1, //month
            theTime.slice(8, 10), //day
            theTime.slice(11, 13), //hour
            theTime.slice(14, 16), //minute
            theTime.slice(17) //second
        );
        return dateTime;
    }

    function makeTemperatureChart(result) {
        var temperatureData = [];
        for (var i = result.length - 1; i >= 0; i--) {
            console.log(result[i].utc);
            var time = prepareTime(result[i].utc);
            var temperature = parseFloat(result[i].data.ta);
            temperatureData.push([time, temperature]);
        }

        temperatureData.sort(function(a, b){
            return (a[0] - b[0]);
        });

        console.log(temperatureData);

        /*var firstTime = result[result.length - 1].time;
        var timeStart = Date.UTC(
            firstTime.slice(0, 4), //year
            firstTime.slice(5, 7), //month
            firstTime.slice(8, 10), //day
            firstTime.slice(11, 13), //hour
            firstTime.slice(14, 16), //minute
            firstTime.slice(17) //second
        );*/

        var temperatureChart = new Highcharts.Chart({
            chart: {
                renderTo: 'temperatureChart',
                type: 'line'
            },
            title: {
                text: 'Temperatura'
            },
            subtitle: {
                text: 'Ostatnie pomiary'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Temperatura (st. C)'
                }
            },
            series: [{
                data: temperatureData/*,
                pointStart: timeStart,
                pointInterval: 60 * 1000 //one minute */
            }]
        });
    }

});