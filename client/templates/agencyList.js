/**
*	Author: Peter
*/

Template.agencyList.onRendered(function () {
	 var addAgencyValidator = $('#add-agency-form').validate({
	 	submitHandler: function (form, event) {
	 		event.preventDefault();

	 		var name = $('#add-agency-name').val();
	 		var email = $('#add-agency-email').val();
	 		var category = $('#add-agency-category').val();
	 		var contact = $('#add-agency-contact').val();
	 		var address = $('#add-agency-address').val();

	 		if (category === 'select') {
	 			addAgencyValidator.showErrors({
	 				category: 'Please select the correct agency category!'
	 			});

	 			return false;
	 		} else {
	 			Meteor.call('addAgency', name, email, category, contact, address, function (error, result) {
	 				if (error) {
	 					swal('Add Agency', error.reason, 'error');
	 				} else {
	 					swal({
		 					title: 'Add Agency',
		 					text: 'The new agency has successfully been added!',
		 					type: 'success'
		 				}, function () {
		 					$("#add-agency-modal").modal('hide');
		 					$('#add-agency-form')[0].reset();
		 				});
	 				}
	 			});
	 		}
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
	 		category: {
	 			categoryCheck: true
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

// jQuery validator add-on methods
jQuery.validator.addMethod("categoryCheck", function(value, element) {
    return this.optional(element) || /[^{select}]/.test(value);
}, "Please select the correct agency category!");

Template.agencyList.helpers({
	isEmptyAgencyList: function () {
		return Agencies.find().count() === 0;
	},
	agencyList: function () {
		return 	Agencies.find();
	},
	getCategoryList: function () {
		return Categories.find();
	}
});

Template.agencyItem.events({
	'click #edit-agency-button': function () {
		Router.go('editAgency', {
			_id: this._id
		});
	},

	'click #delete-agency-button': function () {
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
            Meteor.call('deleteAgency', this._id, function (error, result) {
				if (error) {
					swal('Delete Agency', error.reason, 'error');
				} else {
					swal('Delete Agency', 'The agency has been successfully removed from the database!', 'success');
				}
			});
        }.bind(this));
	}
});