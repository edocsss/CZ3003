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
				'<h5 id="firstHeading" class="text-center">Create New Case</h5>'+

				'<div class="container-fluid">'+
					'<form class="form-horizontal center-block" id ="create-case-form">' +
					
						'<div class="form-group">'+
							'<div class="col-sm-12">'+
								'<input type="text" class="form-control" name="title" placeholder="Title" id ="create-case-title">'+
							'</div>'+
						'</div>'+


						'Case Type:' +

						'<div class="form-group">'+
							'<div class="col-sm-12">'+
				    			'<select class="form-control formwidth" name="type" width="200" id ="create-case-type">' +
								 	'<option value="opt1">Fire</option>'+
								  	'<option value="opt2">Bigger Fire</option>'+
								'</select>'+
							'</div>'+
						'</div>'+
						
						'Address:' +

						'<div class="form-group">'+
							'<div class="col-sm-12">'+
								'<input type="text" class="form-control" name="address" placeholder="Address" id ="create-case-address"/>'+
							'</div>'+
						'</div>'+
						
						'Description:' +

						'<div class="form-group">'+
							'<div class="col-sm-12">'+
								'<textarea class="form-control formwidth" name="description" id ="create-case-description"></textarea>' +
							'</div>'+
						'</div>'+
						
						'<div class="form-group">'+
							'<div class="col-sm-5">'+
								'<input type="reset"  class="btn btn-primary left-block" value="Reset">'+ 
							'</div>'+
							'<div class="col-sm-6">'+ 
								'<input type="submit" class="btn btn-primary left-block" value="Submit">' +
							'</div>'+
						'</div>'+
						
					'</form>'+
				'</div>' ;

			infowindow = new google.maps.InfoWindow({ 
				content: contentString
			});

			marker.addListener('click', function() {
				infowindow.open(GoogleMaps.maps.map.instance, marker);
			});
		}
	}
});

Template.map.onRendered(function () {


			var createCaseValidator = $('#create-case-form').validate({
				submitHandler: function (form, event) {

					console.log ("lolbefore");
					event.preventDefault();
					console.log ("lol");

					var title 		= $('#create-case-title').val();
					var type 		= $('#create-case-type').val();
					var address 	= $('#create-case-address').val();
					var description = $('#create-case-description').val();

					return false;
					/*
					Meteor.createCaseWithPassword(email, password, function (error) {
						if (error) {
							if (error.reason == "User not found") {
								createCaseValidator.showErrors({
									email: error.reason
								});
							}

							if (error.reason == "Incorrect password") {
								createCaseValidator.showErrors({
									password: error.reason
								});
							}

							if (error.reason != "User not found" & error.reason != "Incorrect password") {
								swal('createCase', error.reason, 'error');
							}
						}
					});*/
				},
				rules: {
					title: {
						minlength: 3,
						maxlength: 20,
						required: true
					},
					type: {
						required: true
					},
					address: {
						minlength: 3,
						maxlength: 40,
						required: true
					},
					description: {
						minlength: 3,
						maxlength: 200,
						required: true
					}
				},

				messages: {
					title: {
						minlength: "The case title must be between 3 to 20 characters!",
						maxlength: "The case title must be between 3 to 20 characters!",
						required: "You must enter a case title!"
					},
					type: {
						required: "You must select a case type!"
					}, 
					address: {
						minlength: "The address must be between 3 to 40 characters!",
						maxlength: "The address must be between 3 to 40 characters!",
						required: "You must enter an address!"
					}, 
					description: {
						minlength: "The description must be between 3 to 200 characters!",
						maxlength: "The description must be between 3 to 200 characters!",
						required: "You must enter a description!"
					}
				},
				highlight: function (element) {
					$(element).closest('.form-group').addClass('has-error');
					$(element).closest('.form-group').removeClass('has-success');
				},
				unhighlight: function (element) {
					$(element).closest('.form-group').addClass('has-success');
					$(element).closest('.form-group').removeClass('has-error');
				},
				errorElement: 'span',
				errorClass: 'help-block',
				errorPlacement: function (error, element) {
					if (element.parent('.input-group').length) {
						error.insertAfter(element.parent());
					} else {
						error.insertAfter(element);
					}
				}
			});
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


/*

	TODO

	Benerin form --> ikutin Bootstrap classes (see resetPasswordForm for example) V
	Form checking --> use jQuery validator (see other JS files loginForm.js)
	create insert method @ methods.js
	Marker --> different color and undragable for existing cases
	Load existing cases marker initially
	Observe realtime cases (see below)
	Kalau ada user lgsg approve, else pending + severity NULL

*/
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
