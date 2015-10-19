/**
*	Author: Joshua Aristo
*/

Meteor.startup(function () {
	GoogleMaps.load();
});

var contentString;
var contentStringTop;
var contentStringMid;
var contentStringBot;

var infowindow;
var prev_infowindow;

var newMarker; 
var markerList = []; 
var markerCnt = 0;
var casesList = {};   
var currentUser;

Template.map.onCreated(function () {
	GoogleMaps.ready('map', function (map) {
		google.maps.event.addListener(map.instance, 'click', function(event) {
			console.log(event.latLng);
			placeMarker(event.latLng);
		});  
				
		// bounds of the desired area
		//center: new google.maps.LatLng(1.346286, 103.680793),
		var allowedBounds = new google.maps.LatLngBounds(
		  new google.maps.LatLng(1.206286, 103.580793),
		  new google.maps.LatLng(1.496286, 104.080793)
		);
		var boundLimits = {
			maxLat : allowedBounds.getNorthEast().lat(),
			maxLng : allowedBounds.getNorthEast().lng(),
			minLat : allowedBounds.getSouthWest().lat(),
			minLng : allowedBounds.getSouthWest().lng()
		};

		var lastValidCenter = map.instance.getCenter();
		var newLat, newLng; 
		google.maps.event.addListener(map.instance, 'center_changed', function() {
			
			var center = map.instance.getCenter();
			
			if (allowedBounds.contains(center)) {
				// still within valid bounds, so save the last valid position
				lastValidCenter = map.instance.getCenter();
				return;
			}
			newLat = lastValidCenter.lat();
			newLng = lastValidCenter.lng();
			if(center.lng() > boundLimits.minLng && center.lng() < boundLimits.maxLng){
				newLng = center.lng();
			}
			if(center.lat() > boundLimits.minLat && center.lat() < boundLimits.maxLat){
				newLat = center.lat();
			}
			map.instance.panTo(new google.maps.LatLng(newLat, newLng));
		});


		var query = Cases.find({
			status: 'Approved'
		});

		query.observe({   
			added: function(caseInp) {
				// Create a marker for this data 
				var col = "";
				var id = caseInp._id;
				//console.log("Added: " + id);
				
				if (caseInp.severity == "Very High") col = "black";
				else if (caseInp.severity == "High") col = "red";
				else if (caseInp.severity == "Medium") col = "orange";
				else col = "yellow";
				var pinImage = new google.maps.MarkerImage("https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_" + col + ".png",
					           new google.maps.Size(22, 40),
					           new google.maps.Point(0,0),
					           new google.maps.Point(11, 40));

				markerList[id] = new google.maps.Marker({
					draggable: false, 
					position: {lat:caseInp.coordinate.H, lng:caseInp.coordinate.L}, 
					map: GoogleMaps.maps.map.instance,
					icon: pinImage, 
					title: caseInp.title
				});

				var tmpcont = 
				'<div class="container-fluid">'+
					'<h5 id="firstHeading" class="text-center">'+ caseInp.title + '</h5>'+
					'Location: ' + caseInp.address + '<br>' +
					'Type: ' + caseInp.category + '<br>' +
					'Severity: ' + caseInp.severity + '<br>' +
					'Description: ' + caseInp.description + '<br>' +
				'</div>';

				markerList[id].info = new google.maps.InfoWindow({ 
					content: tmpcont
				}); 

				markerList[id].addListener('click', function() {
					if (prev_infowindow){	
						prev_infowindow.close();
					}
					this.info.open(GoogleMaps.maps.map.instance, this); //has to call this, else reference is lost
					prev_infowindow = this.info;
				});

			},
			changed: function(caseInp) {
				var id = caseInp._id;
				var col = "";
				//console.log("Edited: " + id);

				if (caseInp.severity == "Very High") col = "black";
				else if (caseInp.severity == "High") col = "red";
				else if (caseInp.severity == "Medium") col = "orange";
				else col = "yellow";
				var pinImage = new google.maps.MarkerImage("https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_" + col + ".png",
					           new google.maps.Size(22, 40),
					           new google.maps.Point(0,0),
					           new google.maps.Point(11, 40));

				markerList[id].setPosition({lat: caseInp.coordinate.H, lng:caseInp.coordinate.L});
				markerList[id].setIcon(pinImage);

				var tmpcont = 
				'<div class="container-fluid">'+
					'<h5 id="firstHeading" class="text-center">'+ caseInp.title + '</h5>'+
					'Location: ' + caseInp.address + '<br>' +
					'Type: ' + caseInp.category + '<br>' +
					'Severity: ' + caseInp.severity + '<br>' +
					'Description: ' + caseInp.description + '<br>' +
				'</div>';

				//close old infowindow and clear the listener
				markerList[id].info.close();
				google.maps.event.clearInstanceListeners(markerList[id]); 
				
				markerList[id].info = new google.maps.InfoWindow({ 
					content: tmpcont
				}); 
				
				markerList[id].addListener('click', function() {
					if (prev_infowindow){	
						prev_infowindow.close();
					}
					this.info.open(GoogleMaps.maps.map.instance, this); //has to call this, else reference is lost
					prev_infowindow = this.info;
				});
			},
			removed: function(caseInp) {
				var id = caseInp._id;
				//console.log("Deleted: " + id);
				// Remove the marker from the map
				markerList[id].setMap(null);

				// Clear the event listener
				google.maps.event.clearInstanceListeners(markerList[id]);

				// Remove the reference to this marker instance
				//delete markers[oldDocument._id];
			}
		});	
	}); 

	function placeMarker(location) {
		if ( newMarker ) { 
			console.log(location);
			newMarker.setMap(GoogleMaps.maps.map.instance); 
			// newMarker.position = {
			// 	lat: location.lat(),
			// 	lng: location.lng()
			// };
			newMarker.setPosition({lat: location.lat(), lng:location.lng()});

			infowindow.close();	//remove this if we dont want to close window on move

			// // Reinitialize InfoWindow --> because there is a possibility that the user signs in and there is a marker opened
			// currentUser = Meteor.user();
			// var tempContent = contentStringTop; 
			// if (!!currentUser && ['admin', 'call-center-operator'].indexOf(currentUser.profile.type) > -1) tempContent = tempContent + contentStringMid; //form elements only for logged-in accounts	 
			// tempContent = tempContent + contentStringBot;
			// infowindow = new google.maps.InfoWindow({ content: tempContent });

   //      	// newMarker.setAnimation(google.maps.Animation.DROP);			//remove this if we dont want it to re-drop on marker move
			// infowindow.open(GoogleMaps.maps.map.instance, newMarker);	//remove this if we dont want to close window on move

		} else {
			var pinImage = new google.maps.MarkerImage("https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green+.png",
		        new google.maps.Size(22, 40),
		        new google.maps.Point(0,0),
		        new google.maps.Point(11, 40));
			
			newMarker = new google.maps.Marker({
				draggable: true,
				animation: google.maps.Animation.DROP,
				position: location,
				map: GoogleMaps.maps.map.instance,
				icon: pinImage, 
				title: "Submit a new case"

			});
 		}

 		currentUser = Meteor.user();
		var tmpContent = Blaze.toHTML(Template.mapFormContent);
		infowindow = new google.maps.InfoWindow({ content: tmpContent });

		// Set infowindow events --> add jQuery validator also
		google.maps.event.addListener(infowindow, 'domready', function () {
			var createCaseValidator = $('#create-case-form').validate({
				submitHandler: function (form, event) {
					event.preventDefault();
					
					var title 		= $('#create-case-title').val();
					var type 		= $('#create-case-type').val();
					var address 	= $('#create-case-address').val();
					var description = $('#create-case-description').val();
					var coordinate  = newMarker.getPosition();
					var severity;

					if (!!currentUser && ['admin', 'call-center-operator'].indexOf(currentUser.profile.type) > -1) {
						severity    = $('#create-case-severity').val();
					} else {
						severity    = "N/A";
					}

					if (!type ) {
						createCaseValidator.showErrors({
							type: "Please select the correct Case Type!"
						});
					} else if (!severity) {
						createCaseValidator.showErrors({
							severity: "Please select the correct Case Severity!"
						});
					}
					
					console.log(coordinate.lat(), coordinate.lng());
					Meteor.call('addCase', title, type, description, address, {H: coordinate.lat(), L: coordinate.lng() }, severity ,function (error, result) {
						if (error) {
							swal('Oops!', error.reason, 'error');
						} else {
							swal({
								title: 'Thank you!',
								text: 'The new case has been reported!',
								type: 'success'
							});
							form.reset();			//clear form
							infowindow.close();		//close infowindow
							newMarker.setMap(null);	//remove marker
						}
					});
				},
				rules: {
					title: {
						minlength: 3,
						maxlength: 50,
						required: true
					},
					type: {
						required: true
					},
					address: {
						minlength: 3,
						maxlength: 50,
						required: true
					},
					description: {
						minlength: 3,
						maxlength: 300,
						required: true
					},
					severity: {
						required: true
					}
				},

				messages: {
					title: {
						minlength: "Title must be between 3 to 50 characters long!",
						maxlength: "Title must be between 3 to 50 characters long!",
						required: "You must enter a case title!"
					},
					type: {
						required: "You must select a case type!"
					}, 
					address: {
						minlength: "Address must be between 3 to 50 characters long!",
						maxlength: "Address must be between 3 to 50 characters long!",
						required: "You must enter an address!"
					}, 
					description: { 
						maxlength: "Description cannot exceed 300 characters!",
						required: "You must enter a description!"
					},
					severity: {
						required: "You must select a severity level!"
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

		//open by default
		if (prev_infowindow){	
			prev_infowindow.close();
		}

		infowindow.open(GoogleMaps.maps.map.instance, newMarker);	
		prev_infowindow = infowindow;

		newMarker.addListener('click', function() {
			if (prev_infowindow){	
				prev_infowindow.close();
			}
			infowindow.open(GoogleMaps.maps.map.instance, newMarker);
			prev_infowindow = infowindow;
		}); 
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