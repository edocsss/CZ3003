Meteor.methods({
	'addSubscriber': function (emailAddress) {
		// Check whether this emailAddress exists in DB
		// If it exists, return a Meteor Error
		var s = Subscribers.findOne({
			email: emailAddress
		});

		if (s) {
			throw new Meteor.Error("Your email address has been subscribed previously!");
		}

		Subscribers.insert({
			email: emailAddress,
			createdOn: new Date()
		});
	},
	'checkSubscriber': function () {
		console.log(Subscribers.find().count());
	},
	sendEmail: function (to, from, subject, text) {
		check([to, from, subject, text], [String]);
		this.unblock();

		Email.send({
			to: to,
			from: from,
			subject: subject,
			text: text
		});
	}
});