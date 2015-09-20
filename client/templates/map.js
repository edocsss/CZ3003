Meteor.startup(function () {
	GoogleMaps.load();
});

Template.map.onCreated(function () {
	GoogleMaps.ready('map', function (map) {
		console.log("MAP READY!");
	});
});

Template.map.helpers({
	mapOptions: function () {
		if (GoogleMaps.loaded()) {
			return {
				center: new google.maps.LatLng(1.346286, 103.680793),
				zoom: 17/*,
				mapTypeId: google.maps.MapTypeId.SATELLITE*/
			};
		}
	}
});