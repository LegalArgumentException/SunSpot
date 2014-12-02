$(document).ready(function() {
	$(window).on("resize", updateSize);
	
	var latitudeDefault = 47.656467;
	var longitudeDefault = -122.308969;
	var currentLocation = new google.maps.LatLng(latitudeDefault, longitudeDefault);

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
		$('input#latitude').attr("value", curPosition.lat());
		$('input#longitude').attr("value", curPosition.lng());
	});
	updateSize();
	$("#efficiencySlider").simpleSlider("setValue", 15);
	$("#efficiencySlider").bind("slider:changed", function (event, data) {
  		$("#efficiency").html(Math.floor(data.value) + "%");
	});
});

function updateSize() {
	var headerHeight = $("header").height();
	$("#maparea, #sidebar").height($(window).height() - (headerHeight + 33));
	// if($(sidebar).width() < 340) {
	// 	$(sidebar).width(340);
	// 	$(maparea).width($(window).width() - ($sidebar).width());
	// }
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

// function makeSlider() {
// 	var select = $( "#minbeds" );
//     var slider = $( "<div id='slider'></div>" ).insertAfter( select ).slider({
//       min: 1,
//       max: 6,
//       range: "min",
//       value: select[ 0 ].selectedIndex + 1,
//       slide: function( event, ui ) {
//         select[ 0 ].selectedIndex = ui.value - 1;
//       }
//     });
//     $( "#minbeds" ).change(function() {
//       slider.slider( "value", this.selectedIndex + 1 );
//     });
// }