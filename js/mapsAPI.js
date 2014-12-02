	var dataArray = solarData.split(' ');
	var latitudeDefault = 47.656467;
	var longitudeDefault = -122.308969;
	var monthArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var currentLocation = new google.maps.LatLng(latitudeDefault, longitudeDefault);
	var currentEfficiency = 0;
	var currentYield = 0;
	var currentMonth = 0;
	var surfaceArea = 0;

$(document).ready(function() {

	$(window).on("resize", updateSize);
	$("#surfaceArea").keydown(updateResults());
	$("#efficiencySlider").change(updateResults());
	$("#months").on("change", function () {
		getPosData(Math.round($('p#latitude').html()), Math.round($('p#longitude').html()), dataArray, monthArray);
	});
	$("#change").on("click", function() { 
		getPosData(Math.round($('p#latitude').html()), Math.round($('p#longitude').html()), dataArray, monthArray);
	});

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
	});
	updateSize();
	$("#efficiencySlider").simpleSlider("setValue", 1);
	$("#efficiencySlider").bind("slider:changed", function (event, data) {
  		$("#efficiency").html(Math.floor(data.value) + "%");
  		updateResults();
	});
});
	
function updateSize() {
	var headerHeight = $("header").height();
	$("#maparea, #sidebar").height($(window).height() - (headerHeight + 33));
}

function showPosition (position) {
	latitudeDefault = position.coords.latitude;
	longitudeDefault = position.coords.longitude;
	$('p#latitude').html(latitudeDefault);
	$('p#longitude').html(longitudeDefault);
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
	currentYield = monthArray[$("#monthSelect").val() - 1];
	$("#resultsArea").html(Math.round(currentEfficiency) +
	 "% (efficiency) * <br/>" + currentYield + " (kwh/square meter/day) * <br/>" +
	  surfaceArea + " (square meters) * <br/>75% (average performance ratio) =");
	var totalYield = currentEfficiency * currentYield * surfaceArea * .75;
	$("#totalResults").html(Math.round(totalYield) + " <br/>(kwh per day)");
}