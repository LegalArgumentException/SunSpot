$(document).ready(function() {
	$(window).on("resize", updateSize);
	
	var latitudeDefault = 47.656467;
	var longitudeDefault = -122.308969;
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	}
	var mapOptions = {
		center: {lat: latitudeDefault, lng: longitudeDefault},
		zoom: 8
	};
	var map = new google.maps.Map(document.getElementById('maparea'), mapOptions);
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
	$('input#latitude').attr("value", latitudeDefault);
	$('input#longitude').attr("value", longitudeDefault);
}

// function addMyMarker() {
// 	var marker = new google.maps.Marker({
// 		position: geo
// 		map: map,
// 		draggable: true,
// 		animation: google.maps.
		
// 	});
// }

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