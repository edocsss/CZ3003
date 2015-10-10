Template.editCase.onRendered(function () {
	var caseId = this.data._id,
		currentCase = Cases.findOne(caseId);
	$("#edit-case-category").val(currentCase.category);
	$("#edit-case-severity").val(currentCase.severity);
	$("#edit-case-status").val(currentCase.status);

	var editCaseValidator = $('#edit-case-form').validate({
	 	submitHandler: function (form, event) {
	 		event.preventDefault();

	 		var title = $('#edit-case-title').val();
	 		var category = $('#edit-case-category').val();
	 		var description = $('#edit-case-description').val();
	 		var address = $('#edit-case-address').val();
	 		var coordinate = Cases.findOne(caseId).coordinate;
	 		var severity = $('#edit-case-severity').val();
	 		var status = $('#edit-case-status').val();

	 		console.log(severity);
	 		if (!category) {
	 			editCaseValidator.showErrors({
	 				category: 'Please select the correct Case category!'
	 			});

	 			return false;
	 		} else if (!severity) {
	 			editCaseValidator.showErrors({
	 				severity: 'Please select the correct Case Severity!'
	 			});

	 			return false;
	 		} else if (!status) {
	 			editCaseValidator.showErrors({
	 				status: 'Please select the correct Case Status!'
	 			});

	 			return false;
	 		} else {
		 		Meteor.call('editCase', caseId, title, category, description, address, coordinate, severity, status, function (error, result) {
		 			if (error) {
		 				swal('Edit Case', error.reason, 'error');
		 			} else {
		 				swal({
		 					title: 'Edit Case',
		 					text: 'The case has successfully been edited!',
		 					type: 'success'
		 				}, function() {
		 					Router.go('cases');
		 				});
		 			}
		 		});
		 	}
	 	},
	 	rules: {
	 		title: {
	 			maxlength: 50,
	 			required: true
	 		},
	 		category: {
	 			categoryCheck: true
	 		},
	 		status: {
	 			statusCheck: true
	 		},
	 		severity: {
	 			severityCheck: true
	 		},
	 		address: {
	 			maxlength: 100,
	 			required: true
	 		},
	 		description: {
	 			maxlength: 500,
	 			required: true
	 		}
	 	},
	 	messages: {
	 		title: {
	 			required: "You must enter the case title.",
	 			maxlength: "The case title must be less than 50 characters."
	 		},
	 		address: {
	 			required: "You must enter the case address.",
	 			maxlength: "The case address must be less than 100 characters."
	 		},
	 		description: {
	 			required: "You must enter the case description.",
	 			maxlength: "The case description must be less than 500 characters."
	 		},
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
}, "Please select the correct Case category.");
jQuery.validator.addMethod("statusCheck", function(value, element) {
    return this.optional(element) || /[^{select}]/.test(value);
}, "Please select the correct Case status.");
jQuery.validator.addMethod("severityCheck", function(value, element) {
    return this.optional(element) || /[^{select}]/.test(value);
}, "Please select the correct Case severity.");

Template.editCase.helpers({
	isCategorySelected: function (k) {
		return k === this.category;
	}
});

Template.editCase.events({
	'click #edit-case-back-button': function () {
		Router.go('cases');
	}
});