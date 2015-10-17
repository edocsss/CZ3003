/**
*	Author: Edwin Candinegara	
*/

Template.forgotPasswordForm.onRendered(function () {
	var forgotPasswordValidator = $('#forgot-password-form').validate({
		submitHandler: function (form, event) {
			event.preventDefault();
			var email = $('#forgot-email').val();

			// Send forgot password	email
			Accounts.forgotPassword({
				email: email
			}, function (error) {
				if (error) {
					if (error.message === 'User not found [403]') {
						forgotPasswordValidator.showErrors({
							email: "We cannot find you email address in our database!"
						});
					}
				} else {
					swal('Forgot Password', 'An email indicating how to reset your password has been successfully sent!', 'success');
				}
			});
		},
		rules: {
			email: {
				minlength: 3,
				maxlength: 50,
				required: true
			}
		},
		messages: {
			email: {
				required: "You must enter an email address!",
				minlength: "Your email address must be between 3 to 50 characters!",
				maxlength: "Your email address must be between 3 to 50 characters!"
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

Template.forgotPasswordForm.events({
	'click .login-link': function () {
		Session.set('isLoginForm', true);
	}
});