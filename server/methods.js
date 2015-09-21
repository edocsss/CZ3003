Meteor.methods({
	'addSubscriber': function (emailAddress) {
		// Check whether this emailAddress exists in DB
		// If it exists, return a Meteor Error
		var s = Subscribers.findOne({
			email: emailAddress
		});
		console.log(s);

		if (s) {
			throw new Meteor.Error("Your email address has been subscribed previously!");
		}

		Subscribers.insert({
			email: emailAddress,
			createdOn: new Date()
		});
	}
});