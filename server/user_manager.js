Meteor.methods({
		/**
	*	Creates a new call center operator account entry into the database.
	*/
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
				createdOn: Meteor.call('convertToGMT8', new Date()),
				createdBy: currentUser.emails[0].address
			}
		});

		Accounts.sendEnrollmentEmail(newOperatorId);
	},

	/**
	*	Edit a particular call center operator entry into the database.
	*/
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

	/**
	*	Delete a particular call center operator account entry from the database.
	*/
	deleteCallCenterOperator: function (userId) {
		var currentUser = Meteor.user();
		if (currentUser.profile.type !== 'admin') {
			throw new Meteor.Error("Unauthorized account", "Your account is not authorized!");
		}

		Meteor.users.remove(userId);
	}
});