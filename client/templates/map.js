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
			placeMarker(event.latLng);
		}); 

<<<<<<< HEAD
		Cases.find({}).observe({  
=======
			markerList[caseinp._id].addListener('click', function() {
				if (prev_infowindow){	
					prev_infowindow.close();
				}
				this.info.open(GoogleMaps.maps.map.instance, this); //has to call this, else reference is lost
				prev_infowindow = this.info;
			});
 
		});

	});
	
	var query = Cases.find({});
	Cases.find().observeChanges({  
		added: function(id, caseInp) {
		// Create a marker for this data 
			var col = "";
			if (caseInp.severity == "High") col = "red";
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
				'<b>Location:</b> ' + caseInp.address + '<br>' +
				'<b>Type:</b> ' + caseInp.category + '<br>' +
				'<b>Severity:</b> ' + caseInp.severity + '<br>' +
				'<b>Description:</b> ' + caseInp.description + '<br>' +
			'</div>';

			markerList[id].info = new google.maps.InfoWindow({ 
				content: tmpcont
			});

			//console.log(markerList[markerCnt]); 

			markerList[id].addListener('click', function() {
				if (prev_infowindow){	
					prev_infowindow.close();
				}
				this.info.open(GoogleMaps.maps.map.instance, this); //has to call this, else reference is lost
				prev_infowindow = this.info;
			});

		},
		changed: function(id, caseInp) {
			
			var col = "";
			if (caseInp.severity == "High") col = "red";
			else if (caseInp.severity == "Medium") col = "orange";
			else col = "yellow";
			var pinImage = new google.maps.MarkerImage("https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_" + col + ".png",
				           new google.maps.Size(22, 40),
				           new google.maps.Point(0,0),
				           new google.maps.Point(11, 40));

			markers[id].setPosition({lat: caseInp.coordinate.H, lng:caseInp.coordinate.L});
			markers[id].setIcon(pinImage);

			var tmpcont = 
			'<div class="container-fluid">'+
				'<h5 id="firstHeading" class="text-center">'+ caseInp.title + '</h5>'+
				'<b>Location:</b> ' + caseInp.address + '<br>' +
				'<b>Type:</b> ' + caseInp.category + '<br>' +
				'<b>Severity:</b> ' + caseInp.severity + '<br>' +
				'<b>Description:</b> ' + caseInp.description + '<br>' +
			'</div>';
		});*/

		var query = Cases.find({
			status: 'Approved'
		});

		query.observe({  
>>>>>>> origin/master
			added: function(caseInp) {
			// Create a marker for this data 
				var col = "";
				var id = caseInp._id;
				//console.log("Added: " + id);
				
				if (caseInp.severity == "High") col = "red";
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

				if (caseInp.severity == "High") col = "red";
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
			newMarker.setMap(GoogleMaps.maps.map.instance); 
			newMarker.setPosition(location);
			infowindow.close();	//remove this if we dont want to close window on move

        	newMarker.setAnimation(google.maps.Animation.DROP);			//remove this if we dont want it to re-drop on marker move
			infowindow.open(GoogleMaps.maps.map.instance, newMarker);	//remove this if we dont want to close window on move

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
		

			currentUser = Meteor.user();
			var tmpContent = contentStringTop; 
			if (!!currentUser && ['admin', 'call-center-operator'].indexOf(currentUser.profile.type) > -1) tmpContent = tmpContent + contentStringMid; //form elements only for logged-in accounts	 
			tmpContent = tmpContent + contentStringBot;
			infowindow = new google.maps.InfoWindow({ content: tmpContent });

			// Set infowindow events --> add jQuery validator also
			google.maps.event.addListener(infowindow, 'domready', function () {
				var createCaseValidator = $('#create-case-form').validate({
					submitHandler: function (form, event) {
						event.preventDefault();
						
						console.log("Okay");
						var title 		= $('#create-case-title').val();
						var type 		= $('#create-case-type').val();
						var address 	= $('#create-case-address').val();
						var description = $('#create-case-description').val();
						var coordinate  = newMarker.getPosition();
						var severity;

						if (!!currentUser && ['admin', 'call-center-operator'].indexOf(currentUser.profile.type) > -1) {
							severity    = $('#create-case-severity').val();
						} else {
							severity    = "NULL";
						}
							
						console.log(title + type + address + description + coordinate + severity);
						
						Meteor.call('addCase', title, type, description, address, coordinate, severity ,function (error, result) {
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
							maxlength: 30,
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
							minlength: "Title must be between 3 to 30 characters long!",
							maxlength: "Title must be between 3 to 30 characters long!",
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


Template.map.onRendered(function () {

	contentString =   
		'<div class="container-fluid windowbox" >'+
			'<h5 id="firstHeading" class="text-center">Create New Case</h5>'+

			'<form class="form-horizontal center-block" id ="create-case-form">' +
			 
				'<div class="form-group">'+
					'<div class="col-sm-12">'+
						'<input type="text" class="form-control formwidth" name="title" placeholder="Title" id ="create-case-title">'+
					'</div>'+
				'</div>'+

				'<div class="form-group">'+
					'<div class="col-sm-12">'+
						'<input type="text" class="form-control formwidth" name="address" placeholder="Address" id ="create-case-address"/>'+
					'</div>'+
				'</div>'+

				'<div class="form-group">'+
					'<div class="col-sm-12">'+
		    			'<select class="form-control formwidth" name="type" width="200" id ="create-case-type">' +
		    				'<option selected disabled hidden value="">Case Type</option>' +
						 	'<option value="Fire">Fire</option>'+
						  	'<option value="Traffic Accidents">Traffic Accidents</option>'+
						'</select>'+
					'</div>'+
				'</div>'+
				  
				'Description:' + 
				'<div class="form-group">'+
					'<div class="col-sm-12">'+
						'<textarea class="form-control formwidth" name="description" id ="create-case-description"></textarea>' +
					'</div>'+
				'</div>'+
				
				'<div class="form-group formwidth">'+
					'<div class="col-sm-6">'+
						'<button type="reset"  class="btn btn-primary">Reset</button>'+ 
					'</div>'+
					'<div class="col-sm-6">'+ 
						'<button type="submit" class="btn btn-primary create-case-submit">Submit</button>' +
					'</div>'+
				'</div>'+
				
			'</form>'+
		'</div>' ;

	contentStringTop =  
		'<div class="container windowbox" >'+
			'<h5 id="firstHeading" class="text-center">Create New Case</h5>'+

			'<form class="form-horizontal center-block" id ="create-case-form">' +
			 
				'<div class="form-group">'+
					'<div class="col-sm-12">'+
						'<input type="text" class="form-control formwidth" name="title" placeholder="Title" id ="create-case-title">'+
					'</div>'+
				'</div>'+

				'<div class="form-group">'+
					'<div class="col-sm-12">'+
						'<input type="text" class="form-control formwidth" name="address" placeholder="Address" id ="create-case-address"/>'+
					'</div>'+
				'</div>'+

				'<div class="form-group">'+
					'<div class="col-sm-12">'+
		    			'<select class="form-control formwidth" name="type" width="200" id ="create-case-type">' +
		    				'<option selected disabled hidden value="">Case Type</option>' +
						 	'<option value="Fire">Fire</option>'+
						  	'<option value="Traffic Accidents">Traffic Accidents</option>'+
						'</select>'+
					'</div>'+
				'</div>';
		
	contentStringMid = 
				'<div class="form-group">'+
					'<div class="col-sm-12">'+
		    			'<select class="form-control formwidth" name="severity" width="200" id ="create-case-severity">' +
		    				'<option selected disabled hidden value="">Severity Level</option>' +
						 	'<option value="Low">Low</option>'+
						  	'<option value="Medium">Medium</option>'+
						  	'<option value="High">High</option>'+ 
						'</select>'+
					'</div>'+
				'</div>';
				
	contentStringBot =
				'Description:' + 
				'<div class="form-group">'+
					'<div class="col-sm-12">'+
						'<textarea class="form-control formwidth" name="description" id ="create-case-description"></textarea>' +
					'</div>'+
				'</div>' +
				'<div class="form-group formwidth">'+
					'<div class="col-sm-6">'+
						'<button type="reset"  class="btn btn-default">Reset</button>'+ 
					'</div>'+
					'<div class="col-sm-6">'+ 
						'<button type="submit" class="btn btn-primary create-case-submit">Submit</button>' +
					'</div>'+
				'</div>'+
				
			'</form>'+
		'</div>' ;

});


/*Template.map.events({
	'click .create-case-submit': function () {
		console.log('click');
		// from Kenrick, just to add some data to db, plz modify accordingly. Thank you :)
 		var title = $('#create-case-title').val();
 		var category = $('#create-case-category').val();
 		var description = $('#create-case-description').val();
 		var address = $('#create-case-address').val();
 		var coordinate = marker.position;
 		var severity = $('#create-case-severity').val();
		Meteor.call('addCase', title, category, description, address, coordinate, severity, function (error, result) {
 			if (error) {
 				swal('Oops!', error.reason, 'error');
 			} else {
 				swal({
 					title: 'Thank you!',
 					text: 'The new case has been reported!',
 					type: 'success'
 				});
 			}
 		});
	}
});*/


/*

	TODO

	Benerin form --> ikutin Bootstrap classes (see resetPasswordForm for example) V
	Form checking --> use jQuery validator (see other JS files loginForm.js) vv
	create insert method @ methods.js v
	Marker --> different color and undragable for existing cases v
	Load existing cases marker initially v
	Observe realtime cases (see below)
	Kalau ada user lgsg approve, else pending + severity NULL v

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
