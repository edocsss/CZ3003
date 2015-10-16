Meteor.startup(function () {
	if (Meteor.users.find().count() === 0) {
		Accounts.createUser({
			email: 'admin1@admin1.com',
			password: '123456',
			profile: {
				name: 'Admin 1',
				email: 'admin1@admin1.com',
				contact: '12345678',
				address: 'Admin Address 1',
				type: 'admin',
				createdOn: new Date(),
				createdBy: 'system'
			}
		});

		Accounts.createUser({
			email: 'admin2@admin2.com',
			password: '123456',
			profile: {
				name: 'Admin 2',
				email: 'admin2@admin2.com',
				contact: '12345678',
				address: 'Admin Address 2',
				type: 'admin',
				createdOn: new Date(),
				createdBy: 'system'
			}
		});

		Accounts.createUser({
			email: 'admin3@admin3.com',
			password: '123456',
			profile: {
				name: 'Admin 3',
				email: 'admin3@admin3.com',
				contact: '12345678',
				address: 'Admin Address 3',
				type: 'admin',
				createdOn: new Date(),
				createdBy: 'system'
			}
		});

		Accounts.createUser({
			email: 'admin4@admin4.com',
			password: '123456',
			profile: {
				name: 'Admin 4',
				email: 'admin4@admin4.com',
				contact: '12345678',
				address: 'Admin Address 4',
				type: 'admin',
				createdOn: new Date(),
				createdBy: 'system'
			}
		});

		Accounts.createUser({
			email: 'admin5@admin5.com',
			password: '123456',
			profile: {
				name: 'Admin 5',
				email: 'admin5@admin5.com',
				contact: '12345678',
				address: 'Admin Address 5',
				type: 'admin',
				createdOn: new Date(),
				createdBy: 'system'
			}
		});

		Accounts.createUser({
			email: 'call1@call1.com',
			password: '123456',
			profile: {
				name: 'Call Center Operator 1',
				email: 'call1@call1.com',
				contact: '12345678',
				address: 'Call Center Operator Address 1',
				type: 'call-center-operator',
				createdOn: new Date(),
				createdBy: 'system'
			}
		});

		Accounts.createUser({
			email: 'call2@call2.com',
			password: '123456',
			profile: {
				name: 'Call Center Operator 2',
				email: 'call2@call2.com',
				contact: '12345678',
				address: 'Call Center Operator Address 2',
				type: 'call-center-operator',
				createdOn: new Date(),
				createdBy: 'system'
			}
		});

		Accounts.createUser({
			email: 'call3@call3.com',
			password: '123456',
			profile: {
				name: 'Call Center Operator 3',
				email: 'call3@call3.com',
				contact: '12345678',
				address: 'Call Center Operator Address 3',
				type: 'call-center-operator',
				createdOn: new Date(),
				createdBy: 'system'
			}
		});

		Accounts.createUser({
			email: 'call4@call4.com',
			password: '123456',
			profile: {
				name: 'Call Center Operator 4',
				email: 'call4@call4.com',
				contact: '12345678',
				address: 'Call Center Operator Address 4',
				type: 'call-center-operator',
				createdOn: new Date(),
				createdBy: 'system'
			}
		});

		Accounts.createUser({
			email: 'call5@call5.com',
			password: '123456',
			profile: {
				name: 'Call Center Operator 5',
				email: 'call5@call5.com',
				contact: '12345678',
				address: 'Call Center Operator Address 5',
				type: 'call-center-operator',
				createdOn: new Date(),
				createdBy: 'system'
			}
		});
	}

	if (Cases.find().count() === 0) {
		Cases.insert({
			title: 'Traffic Accidents 1',
			category: 'Traffic Accidents',
			description: 'Traffic accidents description 1',
			address: 'Traffic accidents address 1',
			coordinate: {
				H: 1.342990,
				L: 103.693146
			},
			severity: "N/A",
			status: 'Pending',
			createdBy: 'system',
			createdOn: new Date()
		});

		Cases.insert({
			title: 'Traffic Accidents 2',
			category: 'Traffic Accidents',
			description: 'Traffic accidents description 2',
			address: 'Traffic accidents address 2',
			coordinate: {
				H: 1.346233,
				L: 103.689858
			},
			severity: 'Medium',
			status: 'Approved',
			createdBy: 'system',
			createdOn: new Date()
		});

		Cases.insert({
			title: 'Traffic Accidents 3',
			category: 'Traffic Accidents',
			description: 'Traffic accidents description 3',
			address: 'Traffic accidents address 3',
			coordinate: {
				H: 1.345378,
				L: 103.686230
			},
			severity: 'High',
			status: 'Rejected',
			createdBy: 'system',
			createdOn: new Date()
		});

		Cases.insert({
			title: 'Traffic Accidents 4',
			category: 'Traffic Accidents',
			description: 'Traffic accidents description 4',
			address: 'Traffic accidents address 4',
			coordinate: {
				H: 1.303774,
				L: 103.831823
			},
			severity: "Very High",
			status: 'Closed',
			createdBy: 'system',
			createdOn: new Date()
		});

		Cases.insert({
			title: 'Traffic Accidents 5',
			category: 'Traffic Accidents',
			description: 'Traffic accidents description 5',
			address: 'Traffic accidents address 5',
			coordinate: {
				H: 1.308574,
				L: 103.831421
			},
			severity: 'Low',
			status: 'Approved',
			createdBy: 'system',
			createdOn: new Date()
		});

		Cases.insert({
			title: 'Fire Accidents 1',
			category: 'Fire Accidents',
			description: 'Fire accidents description 1',
			address: 'Fire accidents address 1',
			coordinate: {
				H: 1.313535,
				L: 103.824458
			},
			severity: "N/A",
			status: 'Pending',
			createdBy: 'system',
			createdOn: new Date()
		});

		Cases.insert({
			title: 'Fire Accidents 2',
			category: 'Fire Accidents',
			description: 'Fire accidents description 2',
			address: 'Fire accidents address 2',
			coordinate: {
				H: 1.337474,
				L: 103.834924
			},
			severity: 'Medium',
			status: 'Approved',
			createdBy: 'system',
			createdOn: new Date()
		});

		Cases.insert({
			title: 'Fire Accidents 3',
			category: 'Fire Accidents',
			description: 'Fire accidents description 3',
			address: 'Fire accidents address 3',
			coordinate: {
				H: 1.334554,
				L: 103.858450
			},
			severity: 'Very High',
			status: 'Rejected',
			createdBy: 'system',
			createdOn: new Date()
		});

		Cases.insert({
			title: 'Fire Accidents 4',
			category: 'Fire Accidents',
			description: 'Fire accidents description 4',
			address: 'Fire accidents address 4',
			coordinate: {
				H: 1.332999,
				L: 103.866647
			},
			severity: 'High',
			status: 'Closed',
			createdBy: 'system',
			createdOn: new Date()
		});

		Cases.insert({
			title: 'Fire Accidents 5',
			category: 'Fire Accidents',
			description: 'Fire accidents description 5',
			address: 'Fire accidents address 5',
			coordinate: {
				H: 1.345265,
				L: 103.695420
			},
			severity: "N/A",
			status: 'Pending',
			createdBy: 'system',
			createdOn: new Date()
		});
	}
});