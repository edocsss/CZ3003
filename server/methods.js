Meteor.methods({
	addSubscriber: function (emailAddress) {
		// Check whether this emailAddress exists in DB
		// If it exists, return a Meteor Error
		var s = Subscribers.findOne({
			email: emailAddress
		});

		if (s) {
			throw new Meteor.Error("Your email address has been subscribed previously!");
		}

		var subscriberId = Subscribers.insert({
			email: emailAddress,
			createdOn: new Date()
		});

		var url = Meteor.absoluteUrl() + "/unsubscribe/" + subscriberId;
		var html = 	"Hi!" +
					"<br><br>" +
					"Thank you for subscribing to ID70 Crisis Management System!" +
					"<br>" +
					"You will now receive case updates." +
					"<br><br>" +
					"In case you would like to unsubscribe from our mailing list, please click on " +
					"<a href='" + url + "'>this link</a>." +
					"<br><br>" +
					"Thank you!";

		Meteor.call('sendEmail', emailAddress, "ID70 Crisis Management System <id70cms@cms.com>", "Subscripton", html);
	},

	removeSubscriber: function (subscriberId) {
		Subscribers.remove(subscriberId);
	},

	sendEmail: function (to, from, subject, html) {
		// http://stackoverflow.com/questions/17845932/using-dynamic-html-templates-in-meteor

		check([to, from, subject, html], [String]);
		this.unblock();

		Email.send({
			to: to,
			from: from,
			subject: subject,
			html: html
		});
	},

	broadcastEmail: function (caseObject) {
		// Use Blaze.toHTML with the caseObject's data
		// Then send it using Meteor.call('sendEmail') method
	},

	// Expecting the created or updated case object (the whole object)
	postFB: function (caseObject) {
		// Craft the message here
		var message = "Testing";
		var url = "https://graph.facebook.com/758909260920907/feed";

		this.unblock();
		HTTP.post(url, {
			data: {
				message: message,
				access_token: 'CAAGtMZBL5drQBAGlCJxzczjqmOJtdp8V635KoJPQKLBVNAVia3ttjYlJk3T5fJygxio7ExvhPDz3ZAHZCcm3F9ZASiHLhc7gIYYhUt61wJBYSrpjPWbVtblL6uPfu9filYRougbjLZAM5tmgZAjG59PHkhbS9pkAMMb4JIptVRzZCEeolqZA9k4M'
			}
		}, function (error, result) {
			if (error) {
				console.log(error);
			} else {
				console.log(result);
			}
		});
	},

	postTweet: function (caseObject) {
		// Craft the message here
		var message = "Testing";
		var url = 'statuses/update';

		twitter.post(url, {
			status: message
		}, function (error, data, result) {
			if (error) {
				console.log(error);
			} else {
				console.log(data, result);
			}
		});
	},

	sendCaseSummary: function () {
		// Fetch the whole list first --> use another method to do this!

		// Construct the summary message here
		var message = "";

		// Send the summary to PM
		// Meteor.call('sendEmail', 'primeminister@gov.sg', 'ID70CMS@gov.sg', 'Periodic CMS Case Sumary', message);
	},

	// MUST CHECK THAT THE CURRENT USER IS AN ADMIN, IF NOT, then return an error, raise a SWAL
	addAgency: function () {

	},

	// MUST CHECK THAT THE CURRENT USER IS AN ADMIN, IF NOT, then return an error, raise a SWAL
	editAgency: function () {

	},

	// MUST CHECK THAT THE CURRENT USER IS AN ADMIN, IF NOT, then return an error, raise a SWAL
	deleteAgency: function () {

	},

	// MUST CHECK THAT THE CURRENT USER IS AN ADMIN, IF NOT, then return an error, raise a SWAL
	addCallCenterOperator: function (name, email, contact, address) {
		var currentUser = Meteor.user();
		if (currentUser.profile.type !== 'admin') {
			throw new Meteor.Error("Unauthorized account", "Your account is not authorized!");
		}

		// NO PASSWORD INITIALLY!!
		var newOperatorId = Accounts.createUser({
			email: email,
			profile: {
				name: name,
				email: email,		// A hack, because if not, the client cannot get the users email --> can only see this user's email
				contact: contact,
				address: address,
				type: 'call-center-operator',
				createdOn: new Date(),
				createdBy: currentUser.emails[0].address
			}
		});

		Accounts.sendEnrollmentEmail(newOperatorId);
	},

	// MUST CHECK THAT THE CURRENT USER IS AN ADMIN, IF NOT, then return an error, raise a SWAL
	editCallCenterOperator: function (userId, name, contact, address) {
		var currentUser = Meteor.user();
		if (currentUser.profile.type !== 'admin') {
			throw new Meteor.Error("Unauthorized account", "Your account is not authorized!");
		}

		var profile = Meteor.users.findOne(userId).profile;
		profile.name = name;
		profile.contact = contact;
		profile.address = address;

		Meteor.users.update(userId, {
			$set: {
				profile: profile
			}
		});
	},

	// MUST CHECK THAT THE CURRENT USER IS AN ADMIN, IF NOT, then return an error, raise a SWAL
	deleteCallCenterOperator: function (userId) {
		var currentUser = Meteor.user();
		if (currentUser.profile.type !== 'admin') {
			throw new Meteor.Error("Unauthorized account", "Your account is not authorized!");
		}

		Meteor.users.remove(userId);
	}
});