/**
*	Author: Edwin Candinegara	
*/

Template.enrollAccountForm.onCreated(function () {
	if (Accounts._resetPasswordToken) {
		Session.set('enrollAccountToken', Accounts._resetPasswordToken);
	}
});

Template.enrollAccountForm.onRendered(function () {
	var enrollAccountValidator = $('#enroll-account-form').validate({
		submitHandler: function (form, event) {
			event.preventDefault();
			var password = $('#enroll-password').val();
			var confirmPassword = $('#enroll-confirm-password').val();

			if (password !== confirmPassword) {
				enrollAccountValidator.showErrors({
					'confirm-enroll-password': 'Password mismatch!'
				});

				return false;
			} else {
				var resetToken = Session.get('enrollAccountToken');

				// REMEMBER!!
				// This will log the user into the system automatically!
				Accounts.resetPassword(resetToken, confirmPassword, function (error) {
					if (error) {
						swal('Set Password', 'We are sorry but something went wrong and your password has not been changed yet', 'error');
					} else {
						Session.set('enrollAccountToken', null);
						swal('Set Password', 'Your password has been successfully set!', 'success');
						Router.go('home');
					}
				});
			}
		},
		rules: {
			'enroll-password': {
				minlength: 6,
				required: true
			},
			'confirm-enroll-password': {
				minlength: 6,
				required: true
			}
		},
		messages: {
			'enroll-password': {
				required: "You must enter your new password!",
				minlength: "Your must be at least 6 characters!"
			},
			'confirm-enroll-password': {
				required: "You must confirm your new password!",
				minlength: "Your must be at least 6 characters!"
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