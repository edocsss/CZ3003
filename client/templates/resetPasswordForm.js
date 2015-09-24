Template.resetPasswordForm.onCreated(function () {
	if (Accounts._resetPasswordToken) {
		Session.set('resetPasswordToken', Accounts._resetPasswordToken);
	}
});

Template.resetPasswordForm.onRendered(function () {
	var resetPasswordValidator = $('#reset-password-form').validate({
		submitHandler: function (form, event) {
			event.preventDefault();
			var password = $('#reset-password').val();
			var confirmPassword = $('#reset-confirm-password').val();

			if (password !== confirmPassword) {
				resetPasswordValidator.showErrors({
					'confirm-new-password': 'Password mismatch!'
				});

				return false;
			} else {
				var resetToken = Session.get('resetPasswordToken');

				// REMEMBER!!
				// This will log the user into the system automatically!
				Accounts.resetPassword(resetToken, confirmPassword, function (error) {
					if (error) {
						swal('Reset Password', 'We are sorry but something went wrong and your password has not been changed yet', 'error');
					} else {
						Session.set('resetPasswordTokn', null);
						swal('Reset Password', 'Your password has been successfully changed!', 'success');
						Router.go('home');
					}
				});
			}
		},
		rules: {
			'new-password': {
				minlength: 6,
				required: true
			},
			'confirm-new-password': {
				minlength: 6,
				required: true
			}
		},
		messages: {
			'new-password': {
				required: "You must enter your new password!",
				minlength: "Your must be at least 6 characters!"
			},
			'confirm-new-password': {
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