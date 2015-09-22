Meteor.startup(function () {
	if (Meteor.users.find().count() === 0) {
		Accounts.createUser({
			email: 'admin@admin.com',
			password: '123456',
			profile: {
				type: 'admin'
			}
		});

		Accounts.createUser({
			email: 'call@call.com',
			password: '123456',
			profile: {
				type: 'call-center-operator'
			}
		});

		Accounts.createUser({
			email: 'edocsss@gmail.com',
			password: '123456',
			profile: {
				type: 'admin'
			}
		});
	}

	// Setting up FORGOT PASSWORD URL TEMPLATE
	Accounts.emailTemplates.resetPassword.text = function (user, url) {
		url = url.replace('#/', '');
		return "Hi there, " + "\n\n" + "To reset your password, simply open the link below:" + "\n" + url + "\n\n" + "Thanks!";
	};
});