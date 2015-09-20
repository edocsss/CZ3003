Template.loginForm.onRendered(function () {
	var loginValidator = $('#login-form').validate({
		submitHandler: function (event) {
			var email = $('[name=email]').val();
			var password = $('[name=password]').val();

			Meteor.loginWithPassword(email, password, function (error) {
				if (error) {
					if (error.reason == "User not found") {
						loginValidator.showErrors({
							email: error.reason
						});
					}

					if (error.reason == "Incorrect password") {
						loginValidator.showErrors({
							password: error.reason
						});
					}
				}
			});
		},
		rules: {
			email: {
				minlength: 3,
				maxlength: 50,
				required: true
			},
			password: {
				minlength: 6,
				required: true
			}
		},
		messages: {
			email: {
				required: "You must enter an email address!",
				minlength: "Your email address must be between 3 to 50 characters!",
				maxlength: "Your email address must be between 3 to 50 characters!"
			},
			password: {
				required: "You must enter your password!",
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

Template.loginForm.events({
	'click .forgot-password-link': function () {
		Session.set('isLoginForm', false);
	}
});