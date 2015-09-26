Meteor.startup(function () {
	GoogleMaps.load();
});

var contentString;

var infowindow;

var marker;

Template.map.onCreated(function () {
	GoogleMaps.ready('map', function (map) {
		console.log("MAP READY!");

		google.maps.event.addListener(map.instance, 'click', function(event) {
			placeMarker(event.latLng);
		});

	});



	function placeMarker(location) {
		if ( marker ) {
			marker.setPosition(location);
			infowindow.close();

		} else {
			marker = new google.maps.Marker({
				draggable: true,
				animation: google.maps.Animation.DROP,
				position: location,
				map: GoogleMaps.maps.map.instance,
				title: "Submit a new case"
			});

			contentString =  
					'<h5 id="firstHeading" class="firstHeading">New Case&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</h3>'+
					'<div id="bodyContent">'+
					'<form class="new-task">' +
					//'Title:<br>' +
        			'<input type="text" name="title" placeholder="Title" /><br><br>'+
					'Case Type:<br>' +
        			'<select name="type" width="200">' +
					 	'<option value="opt1">Fire</option>'+
					  	'<option value="opt2">Bigger Fire</option>'+
					'</select><br><br>'+
					'Address:<br>' +
        			'<input type="text" name="address" placeholder="Address" /><br><br>'+
					'Description:<br>' +
					'<textarea name="description">...</textarea><br><br>' +
					'<input type="reset" value="Reset"> <input type="submit" value="Submit">' +
      				'</form>'+
					'</div>';

			infowindow = new google.maps.InfoWindow({ 
				content: contentString,
				minWidth: 700, 
			});

			marker.addListener('click', function() {
				infowindow.open(GoogleMaps.maps.map.instance, marker);
			});
		}
	}
});

Template.map.helpers({
	mapOptions: function () {
		if (GoogleMaps.loaded()) {
			return {
				center: new google.maps.LatLng(1.346286, 103.680793),
				streetViewControl: false,
				zoom: 17
			};
		}
	}
});


Template.map.events({
	"submit .new-task": function (event) {
		// Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
		//TODO: Input check, make sure all is filled
		var title 		= event.target.title.value;
		var type 		= event.target.type.value;
		var address 	= event.target.address.value;
		var description = event.target.description.value;

		var latlong; //TODO: take from marker
		var datetime; //TODO: take from current datetime

		//TODO: send the data somewhere 

		// Clear form
		event.target.reset();
	}
});

/*	reference

var markers = {};   

Markers.find().observe({  
  added: function(document) {
    // Create a marker for this document
    var marker = new google.maps.Marker({
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(document.lat, document.lng),
      map: map.instance,
      // We store the document _id on the marker in order 
      // to update the document within the 'dragend' event below.
      id: document._id
    });

    // This listener lets us drag markers on the map and update their corresponding document.
    google.maps.event.addListener(marker, 'dragend', function(event) {
      Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
    });

    // Store this marker instance within the markers object.
    markers[document._id] = marker;
  },
  changed: function(newDocument, oldDocument) {
    markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
  },
  removed: function(oldDocument) {
    // Remove the marker from the map
    markers[oldDocument._id].setMap(null);

    // Clear the event listener
    google.maps.event.clearInstanceListeners(
      markers[oldDocument._id]);

    // Remove the reference to this marker instance
    delete markers[oldDocument._id];
  }
});	
	var marker;

	function placeMarker(location) {
		if ( marker ) {
			marker.setPosition(location);
		} else {
			marker = new google.maps.Marker({
				position: location,
				map: GoogleMaps.maps.map.instance
			});
		}
	}

	google.maps.event.addListener(GoogleMaps.maps.map.instance, 'click', function(event) {
		placeMarker(event.latLng);
	});*/