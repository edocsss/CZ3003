Template.forgotPasswordForm.onRendered(function () {
	var forgotPasswordValidator = $('#forgot-password-form').validate({
		submitHandler: function (event) {
			var email = $('[name=email').val();

			// DO SOMETHING WITH FORGOT PASSWORD HERE!
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