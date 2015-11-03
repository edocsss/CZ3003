Meteor.methods({
	/**
	*	Add a new subscriber to the system. This subscriber will be sent an email in case there is a new
	*	case update.
	*/
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
			createdOn: Meteor.call('convertToGMT8', new Date())
		});

		var url = Meteor.absoluteUrl() + "unsubscribe/" + subscriberId;
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

	/**
	*	This method removes a particular subscriber from the database.	
	*/
	removeSubscriber: function (subscriberId) {
		Subscribers.remove(subscriberId);
	}
});