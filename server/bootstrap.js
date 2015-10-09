Meteor.startup(function () {
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
		// * * * * * --> every minute
		// 30 * * * * --> every hour, when the clock hits the minute = 30
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