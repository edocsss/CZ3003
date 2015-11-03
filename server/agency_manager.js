Meteor.methods({
		/**
	*	Creates a new agency entry into the database.
	*/
	addAgency: function (name, email, category, contact, address) {
		var currentUser = Meteor.user();
		if (currentUser.profile.type !== 'admin') {
			throw new Meteor.Error("Unauthorized account", "Your account is not authorized!");
		}

		if (Agencies.findOne({
			$or: [
				{ name: name },
				{ email: email },
			]
		})) {
			throw new Meteor.Error("Agency registered", "An agency with this name or email has been registered in our database!");
		}

		Agencies.insert({
			name: name,
			email: email,
			category: category,
			contact: contact,
			address: address,
			createdBy: Meteor.user().email,
			createdOn: Meteor.call('convertToGMT8', new Date())
		});
	},

	/**
	*	Updates an agency entry in the database.	
	*/
	editAgency: function (agencyId, name, category, contact, address) {
		var currentUser = Meteor.user();
		if (currentUser.profile.type !== 'admin') {
			throw new Meteor.Error("Unauthorized account", "Your account is not authorized!");
		}

		var oldAgencyData = Agencies.findOne(agencyId);
		if (oldAgencyData.name !== name && Agencies.find({ name: name }).count() >= 1) {
			throw new Meteor.Error("Agency registered", "An agency with this name or email has been registered in our database!");
		}

		Agencies.update(agencyId, {
			$set: {
				name: name,
				category: category,
				contact: contact,
				address: address
			}
		});
	},

	/**
	*	Delete a particular agency from the database	
	*/
	deleteAgency: function (agencyId) {
		var currentUser = Meteor.user();
		if (currentUser.profile.type !== 'admin') {
			throw new Meteor.Error("Unauthorized account", "Your account is not authorized!");
		}

		Agencies.remove(agencyId);
	}
});