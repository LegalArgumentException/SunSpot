//	Global Variables
	var dataArray = solarData.split(' ');
	var latitudeDefault = 47.656467;
	var longitudeDefault = -122.308969;
	var monthArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var currentLocation = new google.maps.LatLng(latitudeDefault, longitudeDefault);
	var currentEfficiency = 15.0;
	var currentPerformance = 75.0;
	var currentYield = 0;
	var currentMonth = 0;
	var surfaceArea = 10;

$(document).ready(function() {

	// Attaching Event Handlers
	$(window).on("resize", updateSize);
	$("#surfaceArea").keyup(function() {
		getPosData(Math.round($('p#latitude').html()), Math.round($('p#longitude').html()), dataArray, monthArray);
		updateResults();
	});
	$("#efficiencySlider").change(updateResults());
	$("#monthSelect").change(function () {
		getPosData(Math.round($('p#latitude').html()), Math.round($('p#longitude').html()), dataArray, monthArray);
		updateResults();
	});

	// Initializing sliders
	$("#efficiencySlider").simpleSlider("setValue", 15.0);
	$("#efficiencySlider").bind("slider:changed", function (event, data) {
  		$("#efficiency").html(data.value.toFixed(1) + "%");
  		updateResults();
	});
	$("#performanceSlider").simpleSlider("setValue", 75.0);
	$("#performanceSlider").bind("slider:changed", function (event, data) {
  		$("#performance").html(data.value.toFixed(1) + "%");
  		updateResults();
	});

	// Check to see if geolocation is available on current browser, sets information accordingly if true
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	}
	var mapOptions = {
		center: {lat: latitudeDefault, lng: longitudeDefault},
		zoom: 8
	};
	var map = new google.maps.Map(document.getElementById('maparea'), mapOptions);
	var marker = addMyMarker(latitudeDefault, longitudeDefault, map);
	google.maps.event.addListener(marker, 'dragend', function() {
		var curPosition = marker.getPosition();
		$('p#latitude').html(curPosition.lat());
		$('p#longitude').html(curPosition.lng());
		getPosData(Math.round($('p#latitude').html()), Math.round($('p#longitude').html()), dataArray, monthArray);
		updateResults();
	});
	initializeCoordinates();
	getPosData(Math.round($('p#latitude').html()), Math.round($('p#longitude').html()), dataArray, monthArray);
	updateResults();
	updateSize();

});

function initializeCoordinates() {
	$('p#latitude').html(latitudeDefault);
	$('p#longitude').html(longitudeDefault);
}
	
function updateSize() {
 	if($(window).height() > 1000) {
		var headerHeight = $("header").height();
		$("#maparea, #sidebar").height($(window).height() - (headerHeight + 19));
	}
}

function showPosition (position) {
	latitudeDefault = position.coords.latitude;
	longitudeDefault = position.coords.longitude;
	initializeCoordinates();
}

function addMyMarker(latitude, longitude, map) {
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(latitude, longitude),
		map: map,
		draggable: true,
		animation: google.maps.Animation.DROP,
		icon: "http://maps.google.com/mapfiles/ms/micons/blue.png"		
	});
	return marker;
}

function getPosData(latitude, longitude, dataArray, monthArray) {
	var found = false;
	var iteration = 0;
	while (!found) {
		if(dataArray[iteration] == latitude) {
			if(dataArray[iteration + 1] == longitude) {
				for (i = 0; i < 13; i++) {
					var step = 2 + i;
					monthArray[i] = dataArray[iteration + step];
				}
				found = true;
			}
		}
		iteration += 15;
	}
	updateResults();
}

function updateResults() {
	if($("#surfaceArea").val()) {
		surfaceArea = $("#surfaceArea").val();
	} else {
		surfaceArea = 0;
	}
	currentEfficiency = $("#efficiencySlider").val();
	currentPerformance = $("#performanceSlider").val();
	currentYield = monthArray[$("#monthSelect").val() - 1];
	$("#resultsArea").html($("#efficiency").html() +
	 " (efficiency) * <br/>" + currentYield + " (kwh/square meter/day) * <br/>" +
	  surfaceArea + " (square meters) * <br/>" + $("#performance").html() + " (performance due to surroundings) =");
	var totalYield = (currentEfficiency * 0.01) * currentYield * surfaceArea * (currentPerformance * 0.01);
	$("#totalResults").html(totalYield.toFixed(2) + " <br/>(kwh per day)");
}