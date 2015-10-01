Meteor.startup(function () {
	if (Meteor.users.find().count() === 0) {
		Accounts.createUser({
			email: 'admin@admin.com',
			password: '123456',
			profile: {
				name: 'Admin 1',
				email: 'admin@admin.com',
				contact: '12345678',
				address: 'Address 1',
				type: 'admin',
				createdOn: new Date(),
				createdBy: 'system'
			}
		});

		Accounts.createUser({
			email: 'call@call.com',
			password: '123456',
			profile: {
				name: 'Call 1',
				email: 'call@call.com',
				contact: '12345678',
				address: 'Address 2',
				type: 'call-center-operator',
				createdOn: new Date(),
				createdBy: 'system'
			}
		});
	}

	if (Cases.find().count() === 0) {
		Cases.insert({
			title: 'Case 1',
			category: 'Traffic Accidents',
			description: 'description',
			address: 'address',
			coordinate: 'asd',
			severity: 'High',
			status: 'Approved',
			createdBy: 'system',
			createdOn: new Date()
		});

		Cases.insert({
			title: 'Case 2',
			category: 'Fire',
			description: 'description',
			address: 'address',
			coordinate: 'asd',
			severity: 'Medium',
			status: 'Pending',
			createdBy: 'system',
			createdOn: new Date()
		});

		Cases.insert({
			title: 'Case 3',
			category: 'Traffic Accidents',
			description: 'description',
			address: 'address',
			coordinate: 'asd',
			severity: 'Low',
			status: 'Closed',
			createdBy: 'system',
			createdOn: new Date()
		});
	}

	// Setting up Accounts EMAIL TEMPLATE
	Accounts.emailTemplates.siteName = 'ID70 Crisis Management System';
	Accounts.emailTemplates.from = "ID70 Crisis Management System <id70cms@cms.com>";

	// Setting up Accounts RESET PASSWORD EMAIL TEMPLATE
	Accounts.emailTemplates.resetPassword.subject = function (user) {
		return "How to reset your account's password?";
	};

	Accounts.emailTemplates.resetPassword.html = function (user, url) {
		url = url.replace('/#', '');
		var html = "Hi, " + user.profile.name + "!" + 
					"<br><br>" +
					"We received your forgot password request. In this email, you will find out how to reset your account's password." + 
					"<br><br>" +
					"Please click on " + "<a href='" + url + "'>this link</a> " + "to reset your password." + 
					"<br><br>" +
					"Thank you!";

		return html;
	};

	// Setting up Accounts ACCOUNT ENROLLMENT EMAIL TEMPLATE
	Accounts.emailTemplates.enrollAccount.subject = function (user) {
		return "Your New Account has been Created!";
	};

	Accounts.emailTemplates.enrollAccount.html = function (user, url) {
		url = url.replace('/#', '');
		var html = 	"Hi, " + user.profile.name + "!" +
					"<br><br>" +
					"We just created an account for you using this email address!" +
					"<br>" +
					"Before you are able to login using this email address, we need you to set your account's password." +
					"<br>" +
					"Please click on " + "<a href='" + url + "'>this link</a> " + "to set your account's password." +
					"<br><br>" +
					"Thank you!";

		return html;
	};

	// Setting up the case summary cron job
	var cron = new Meteor.Cron({
		events: {
			'30 * * * *': function () {
				Meteor.call('sendCaseSummary');
			}
		}
	});

	// Setting up Twitter API
	TwitterApi = Meteor.npmRequire('twit');
	twitter = new TwitterApi({
		consumer_key: 'Tw6sIuQJ50pUtAka6gqyaTlnN',
		consumer_secret: 'suDNqDBXu91XAYJIoUERfDH0nuU5aTVavMpSLbi6rQTuuzNP6p',
		access_token: '3668823973-YgRBfVC6vbjnzN1Yws6coRD5MprEOdr7mzBct0j',
		access_token_secret: 'HM4WHpwoq9tX2pTVctJJ9ChauZbI7ipXgeYc7mJvIe9b8'
	});
});