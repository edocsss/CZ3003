/**
*	Author: Edwin Candinegara	
*/

Template.editCallCenterOperator.onRendered(function () {
	var userId = this.data._id;
	var editOperatorValidator = $('#edit-operator-form').validate({
	 	submitHandler: function (form, event) {
	 		event.preventDefault();

	 		var name = $('#edit-operator-name').val();
	 		var contact = $('#edit-operator-contact').val();
	 		var address = $('#edit-operator-address').val();

	 		Meteor.call('editCallCenterOperator', userId, name, contact, address, function (error, result) {
	 			if (error) {
	 				swal('Edit Call Center Operator', error.reason, 'error');
	 			} else {
	 				swal({
	 					title: 'Edit Call Center Operator',
	 					text: 'The call center operator has successfully been edited!',
	 					type: 'success'
	 				}, function () {
	 					Router.go('operators');
	 				});
	 			}
	 		});
	 	},
	 	rules: {
	 		name: {
	 			minlength: 3,
	 			maxlength: 50,
	 			required: true
	 		},
	 		contact: {
	 			minlength: 8,
	 			maxlength: 8,
	 			digits: true,
	 			required: true
	 		},
	 		address: {
	 			minlength: 3,
	 			maxlength: 100,
	 			required: true
	 		}
	 	},
	 	messages: {
	 		name: {
	 			required: "You must enter the call center operator's name!",
	 			minlength: "The call center operator's name must be between 3 to 50 characters!",
	 			maxlength: "The call center operator's name must be between 3 to 50 characters!"
	 		},
	 		contact: {
	 			required: "You must enter the call center operator's contact number!",
	 			minlength: "The call center operator's contact number must consist of 8 digits!",
	 			maxlength: "The call center operator's contact number must consist of 8 digits!",
	 			digits: "The call center operator's contact number must be consist of digits only!"
	 		},
	 		address: {
	 			required: "You must enter the call center operator's address!",
	 			minlength: "The call center operator's address must be between 3 to 100 characters!",
	 			maxlength: "The call center operator's address must be between 3 to 100 characters!"
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

Template.editCallCenterOperator.events({
	'click #edit-operator-back-button': function () {
		Router.go('operators');
	}
});