Meteor.startup(function () {
	if (Meteor.users.find().count() === 0) {
		Accounts.createUser({
			email: 'admin@admin.com',
			password: '123456',
			profile: {
				name: 'Admin 1',
				type: 'admin'
			}
		});

		Accounts.createUser({
			email: 'call@call.com',
			password: '123456',
			profile: {
				name: 'Call Center Operator 1',
				type: 'call-center-operator'
			}
		});

		Accounts.createUser({
			email: 'edocsss@gmail.com',
			password: '123456',
			profile: {
				name: 'Edwin Candinegara',
				type: 'admin'
			}
		});
	}

	// Setting up Accounts EMAIL TEMPLATE
	Accounts.emailTemplates.siteName = 'ID70 Crisis Management System';
	Accounts.emailTemplates.from = "ID70 Crisis Management System <id70cms@cms.com>";
	Accounts.emailTemplates.resetPassword.subject = function (user) {
		return "How to reset your account's password?";
	};

	Accounts.emailTemplates.resetPassword.html = function (user, url) {
		url = url.replace('/#', '');
		var html = "Hi, " + user.profile.name + "!" + 
					"<br><br>" +
					"We received your forgot password request. In this email, you will find out how to reset your account's password." + 
					"<br><br>" +
					"Please click on this " + "<a href='" + url + "'>link</a> " + "to reset your password." + 
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