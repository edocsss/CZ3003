Meteor.startup(function () {
	if (Meteor.users.find().count() === 0) {
		Accounts.createUser({
			email: 'admin@admin.com',
			password: '123456',
			profile: {
				type: 'admin'
			}
		});

		Accounts.createUser({
			email: 'call@call.com',
			password: '123456',
			profile: {
				type: 'call-center-operator'
			}
		});
	}
});