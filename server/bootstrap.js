/**
*	Author: Edwin Candinegara, Kenrick, Joshua Aristo, Peter
*/

Meteor.startup(function () {
	// Setting up the Case Categories
	var categoryList = ["Traffic Accidents", "Fire Accidents", "Gas Leak", "Ambulance Emergency"];
	if (Categories.find().count() < categoryList.length) {
		// Empty the Categories collection first
		Categories.remove();

		for (var x = 0; x < categoryList.length; x++) {
			console.log(categoryList[x]);
			Categories.insert({
				name: categoryList[x]
			});
		}
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
});