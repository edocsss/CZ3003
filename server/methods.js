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
			createdOn: Meteor.call('convertToGMT8', new Date())
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
		check([to, from, subject, html], [String]);
		this.unblock();

		Email.send({
			to: to,
			from: from,
			subject: subject,
			html: html
		});
	},

	broadcastEmail: function (subject, content) {
		var base_url = Meteor.absoluteUrl() + "/unsubscribe/";
		var html =  "Dear subscribers," +
					"<br><br>" +
					content +
					"Regards,<br>" +
					"ID70 Crisis Management Team<br>" +
					"<br>" +
					"Note: This is an auto generated notification. Please do not reply. <br><br>";
		var footer = "";
		var email = "";
		Subscribers.find({}).forEach(function (subscriber) {

			footer = "Too much e-mail from us? Click <a href='" + base_url + subscriber._id + "'>here</a> to unsubscribe<br>";
			// console.log(subscriber);
			email = subscriber.email;
			Meteor.call('sendEmail',
				email,
				"ID70 Crisis Management System <id70cms@cms.com>",
				subject,
				html + footer);
		});
	},

	// Expecting the created or updated case object (the whole object)
	postFB: function (content) {
		// Craft the message here
		var url = "https://graph.facebook.com/758909260920907/feed";

		this.unblock();
		HTTP.post(url, {
			data: {
				message: content,
				access_token: 'CAAGtMZBL5drQBAGlCJxzczjqmOJtdp8V635KoJPQKLBVNAVia3ttjYlJk3T5fJygxio7ExvhPDz3ZAHZCcm3F9ZASiHLhc7gIYYhUt61wJBYSrpjPWbVtblL6uPfu9filYRougbjLZAM5tmgZAjG59PHkhbS9pkAMMb4JIptVRzZCEeolqZA9k4M'
			}
		}, function (error, result) {
			if (error) {
				console.log(error);
			} else {
				// console.log(result);
			}
		});
	},

	postTweet: function (content) {
		var url = 'statuses/update';

		twitter.post(url, {
			status: content
		}, function (error, data, result) {
			if (error) {
				console.log(error);
			} else {
				// console.log(data, result);
			}
		});
	},

	sendCaseSummary: function () {
		// Construct the summary message here
		var content = "Dear Prime Minister," +
					  "<br><br>" +
					  "This email contains a case summary up to " + Meteor.call('convertToGMT8', new Date()) + ".<br><br>" + 
					  '<table style="width: 100%; border-collapse: collapse; border: 1px solid black">' +
					  '<thead>' + 
					  '<tr>' +
					  '<th style="border: 1px solid black; padding: 5px;">' +
					  'Title' +
					  '</th>' +
					  '<th style="border: 1px solid black; padding: 5px;">' +
					  'Category' +
					  '</th>' +
					  '<th style="border: 1px solid black; padding: 5px;">' +
					  'Description' +
					  '</th>' +
					  '<th style="border: 1px solid black; padding: 5px;">' +
					  'Address' +
					  '</th>' +
					  '<th style="border: 1px solid black; padding: 5px;">' +
					  'Severity' +
					  '</th>' +
					  '<th style="border: 1px solid black; padding: 5px;">' +
					  'Status' +
					  '</th>' +
					  '</tr>' +
					  '</thead>' +
					  '<tbody>';

		var cases = Cases.find({});

		if (cases.count() === 0) {
			content += '<tr>' + '<td colspan="6" style="text-align:center; border: 1px solid black padding: 5px;">' + 'There is no case reported yet!' + '</td>' + '</tr>';
		} else {
			Cases.find({}).forEach(function (item) {
				content +=  '<tr>' +
							'<td style="border: 1px solid black; padding: 5px;">' +
							item.title +
							'</td>' +
							'<td style="border: 1px solid black; padding: 5px;">' +
							item.category +
							'</td>' +
							'<td style="border: 1px solid black; padding: 5px;">' +
							item.description +
							'</td>' +
							'<td style="border: 1px solid black; padding: 5px;">' +
							item.address +
							'</td>' +
							'<td style="border: 1px solid black; padding: 5px;">' +
							item.severity +
							'</td>' +
							'<td style="border: 1px solid black; padding: 5px;">' +
							item.status +
							'</td>' +
							'</tr>';
			});
		}

		content +=  '</tbody>' +
					'</table>' +
					'<br><br>' +
					'ID70 Crisis Management Team';

		Meteor.call('sendEmail',
			"edocsss@gmail.com",
			"ID70 Crisis Management System <id70cms@cms.com>",
			"ID70 30-Minutes Case Summary",
			content);
	},

	// MUST CHECK THAT THE CURRENT USER IS AN ADMIN, IF NOT, then return an error, raise a SWAL
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

	// MUST CHECK THAT THE CURRENT USER IS AN ADMIN, IF NOT, then return an error, raise a SWAL
	editAgency: function (agencyId, name, category, contact, address) {
		var currentUser = Meteor.user();
		if (currentUser.profile.type !== 'admin') {
			throw new Meteor.Error("Unauthorized account", "Your account is not authorized!");
		}

		if (Agencies.find({
			name: name
		}).count() > 1) {
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

	// MUST CHECK THAT THE CURRENT USER IS AN ADMIN, IF NOT, then return an error, raise a SWAL
	deleteAgency: function (agencyId) {
		var currentUser = Meteor.user();
		if (currentUser.profile.type !== 'admin') {
			throw new Meteor.Error("Unauthorized account", "Your account is not authorized!");
		}

		Agencies.remove(agencyId);
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
				createdOn: Meteor.call('convertToGMT8', new Date()),
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
	},

	addCase: function (title, category, description, address, coordinate, severity) {
		// todo: limit length of address

		var currentUser = Meteor.user();
		var status = "Pending";
		// var createdBy = null;
		if (!!currentUser) {
			// createdBy = currentUser.emails[0].address;
			if (['admin', 'call-center-operator'].indexOf(currentUser.profile.type) > -1) {
				status = "Approved";
				var subject = "🔔 " + category + " at " + address + ".";
				var content = "We have received a report of " + category + " with details: " +
					"Address     : " + address + "<br>" +
					"Description : " + description + "<br>" +
					"Severity        : " + severity + "<br>" +
					"Date/time   : " + Meteor.call('convertToGMT8', new Date()) + "<br>" +
					"Please avoid travelling to that area until further notification is sent.<br>";
				Meteor.call("broadcastEmail", subject, content);

				var contentFB = "A " + category + " has been reported at " + address + " on " +
								Meteor.call('convertToGMT8', new Date()) + " with severity " + severity + ".\n" +
								"All citizens are advised not to approach the area until further update." + "\n\n" +
								"ID70 Crisis Management Team";
				Meteor.call("postFB", contentFB);

				var contentTwitter = "A " + category + " has been reported at " + address +
									 " on " + Meteor.call('convertToGMT8', new Date()) + ".";
				Meteor.call("postTweet", contentTwitter);
			}
		}
 		
		Cases.insert({
			title: title,
			category: category,
			description: description,
			address: address,
			coordinate: {
				H: coordinate.J,
				L: coordinate.M
			},
			severity: severity,
			status: status,
			lastUpdatedOn: Meteor.call('convertToGMT8', new Date()),
			createdOn: Meteor.call('convertToGMT8', new Date())
		});
	},

	editCase: function (caseId, title, category, description, address, coordinate, severity, status) {
		var currentUser = Meteor.user();
		if (['admin', 'call-center-operator'].indexOf(currentUser.profile.type) === -1) {
			throw new Meteor.Error("Unauthorized account", "Your account is not authorized!");
		}
		var oldCase = Cases.findOne(caseId);
		Cases.update(caseId, {
			$set: {
				title: title,
				category: category,
				description: description,
				address: address,
				coordinate: coordinate,
				severity: severity,
				status: status,
				lastUpdatedOn: Meteor.call('convertToGMT8', new Date())
			}
		});
		var subject = null, content = null, contentFB = null, contentTwitter = null;

		// A "just-approved" case
		if (oldCase.status === "Pending" && status === "Approved") {
			subject = "🔔 " + category + " at " + address + ".";
			content = "We have received a report of " + category + " with details: <br>" +
				"Address     : " + address + "<br>" +
				"Description : " + description + "br>" +
				"Severity        : " + severity + "<br>" +
				"Date/time   : " + oldCase.createdOn + "<br>" +
				"Please avoid travelling to that area until further notification is sent.<br>";

			contentFB = "A " + category +" has been reported at " + address + " on " + oldCase.createdOn + " with " + severity + " severity" + ".\n" + 
						"All citizens are advised not to approach the are until further update." + "\n\n" + 
						"ID70 Crisis Management Team";

			contentTwitter = "A " + category + " has been reported at " + address + " on " + oldCase.createdOn + ".";
		} 
		// A closed case
		else if (status === "Closed") {
			subject = "[CASE CLOSED] " + category + " at " + address + ".";
			content = "The " + category + " reported at " + address + " on " + oldCase.createdOn + " has been resolved.<br>";
			contentFB = "The " + category + " reported at " + address + " on " + oldCase.createdOn + " has been resolved." + "\n\n" + "ID70 Crisis Management Team";
			contentTwitter = "The " + category + " reported at " + addres + " on " + oldCase.createdOn + " has been resolved.";
		} 
		// Any other update (usual case edit)
		else {
			subject = "🔔 " + category + " at " + address + ".";
			content = "The " + category + " reported at " + oldCase.address + " on " + oldCase.createdOn + " has been updated.<br>" +
				"Address     : " + address + "<br>" +
				"Description : " + description + "br>" +
				"Severity        : " + severity + "<br>" +
				"Please avoid travelling to that area until further notification is sent.<br>";

			contentFB = "[UPDATE] " + category + " has been reported at " + address + " on " + oldCase.createdOn +".\n" +
						"All citizens are advised not to approach the area until further update." + "\n\n" +
						"ID70 Crisis Management Team";

			contentTwitter = "[UPDATE] " + category + " has been reported at " + address + " on " + oldCase.createdOn +".";
		}

		Meteor.call("broadcastEmail", subject, content);
		Meteor.call("postFB", contentFB);
		Meteor.call("postTweet", contentTwitter);
	},

	// MUST CHECK THAT THE CURRENT USER IS AN ADMIN, IF NOT, then return an error, raise a SWAL
	deleteCase: function (caseId) {
		var currentUser = Meteor.user();
		if (['admin', 'call-center-operator'].indexOf(currentUser.profile.type) === -1) {
			throw new Meteor.Error("Unauthorized account", "Your account is not authorized!");
		}

		Cases.remove(caseId);
	},

	convertToGMT8: function (date) {
		var utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;

		var singaporeUTCOffset = 8;
		return new Date(utc + singaporeUTCOffset * 60 * 60 * 1000);
	}
});