$(document).ready(function() {
	$(window).on("resize", updateSize)
	var mapOptions = {
		center: {lat: -34.397, lng: 150.644},
		zoom: 8
	};
	var map = new google.maps.Map(document.getElementById('maparea'), mapOptions);
	updateSize();
	//$("#radios").radiosToSlider();
});

function updateSize() {
	var headerHeight = $("header").height();
	$("#maparea, #sidebar").height($(window).height() - headerHeight);
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