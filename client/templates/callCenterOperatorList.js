/**
*	Author: Edwin Candinegara	
*/

Template.callCenterOperatorList.onRendered(function () {
	 var addOperatorValidator = $('#add-operator-form').validate({
	 	submitHandler: function (form, event) {
	 		event.preventDefault();

	 		var name = $('#add-operator-name').val();
	 		var email = $('#add-operator-email').val();
	 		var contact = $('#add-operator-contact').val();
	 		var address = $('#add-operator-address').val();

	 		Meteor.call('addCallCenterOperator', name, email, contact, address, function (error, result) {
	 			if (error) {
	 				swal('Add Call Center Operator', error.reason, 'error');
	 			} else {
	 				swal({
	 					title: 'Add Call Center Operator',
	 					text: 'The new call center operator has successfully been added!',
	 					type: 'success'
	 				}, function () {
	 					$("#add-operator-modal").modal('hide');
	 					$('#add-operator-form')[0].reset();
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
	 		email: {
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
	 		email: {
	 			required: "You must enter the call center operator's email address!",
	 			minlength: "The call center operator's email must be between 3 to 50 characters!",
	 			maxlength: "The call center operator's email must be between 3 to 50 characters!"
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

Template.callCenterOperatorList.helpers({
	isEmptyOperatorList: function () {
		return Meteor.users.find({
			'profile.type': 'call-center-operator'
		}).count() === 0;
	},
	operatorList: function () {
		return 	Meteor.users.find({
					'profile.type': 'call-center-operator'
				}, {
					sort: {
						profile: 1
					}
				});	
	},
});

Template.callCenterOperatorItem.events({
	'click #edit-operator-button': function () {
		Router.go('editOperator', {
			_id: this._id
		});
	},

	'click #delete-operator-button': function () {
		swal({
            title: "Are you sure?",
            text: "You will not be able to recover this operator!",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            closeOnConfirm: false,
            confirmButtonColor: "#E51C23",
            html: false
        }, function() {
            Meteor.call('deleteCallCenterOperator', this._id, function (error, result) {
				if (error) {
					swal('Delete Call Center Operator', error.reason, 'error');
				} else {
					swal('Delete Call Center Operator', 'The call center operator account has been successfully removed from the database!', 'success');
				}
			});
        }.bind(this));
	}
});