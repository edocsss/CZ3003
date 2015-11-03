Meteor.methods({
	/**
	*	Creates a new case entry into the database.
	*/
	addCase: function (title, category, description, address, coordinate, severity) {
		console.log(coordinate);
		// todo: limit length of address

		var currentUser = Meteor.user();
		var status = "Pending";
		// var createdBy = null;
		if (!!currentUser) {
			// createdBy = currentUser.emails[0].address;
			if (['admin', 'call-center-operator'].indexOf(currentUser.profile.type) > -1) {
				status = "Approved";
				var subject = "🔔 " + category + " at " + address + ".";
				var content = "We have received a report of " + category + " with details: <br>" +
					"Address     : " + address + "<br>" +
					"Description : " + description + "<br>" +
					"Severity        : " + severity + "<br>" +
					"Date/time   : " + Meteor.call('dateToString', Meteor.call('convertToGMT8', new Date())) + "<br>" +
					"Please avoid travelling to that area until further notification is sent.<br>";
				Meteor.call("broadcastEmail", subject, content);

				var contentFB = "A " + category + " has been reported at " + address + " on " +
								Meteor.call('dateToString', Meteor.call('convertToGMT8', new Date())) + " with severity " + severity + ".\n" +
								"All citizens are advised not to approach the area until further update." + "\n\n" +
								"ID70 Crisis Management Team";
				Meteor.call("postFB", contentFB);

				var contentTwitter = "A " + category + " has been reported at " + address +
									 " on " + Meteor.call('dateToString', Meteor.call('convertToGMT8', new Date())) + ".";
				Meteor.call("postTweet", contentTwitter);

				var contentAgency = "We have received a report of " + category + " with details: <br>" +
					"Address     : " + address + "<br>" +
					"Description : " + description + "<br>" +
					"Severity        : " + severity + "<br>" +
					"Date/time   : " + Meteor.call('dateToString', Meteor.call('convertToGMT8', new Date())) + "<br>" +
					"Please be in charge of this case.<br>";
				Meteor.call("informAgency", subject, contentAgency, category);
			}
		}
 		
		Cases.insert({
			title: title,
			category: category,
			description: description,
			address: address,
			coordinate: coordinate,
			severity: severity,
			status: status,
			lastUpdatedOn: Meteor.call('convertToGMT8', new Date()),
			createdOn: Meteor.call('convertToGMT8', new Date())
		});
	},

	/**
	*	Inform agencies related to a particular case category when a new case of that particular category is approved.
	*/
	informAgency: function (subject, content, category) {
		Agencies.find({ category: category }).forEach(function (agency) {
			Meteor.call('sendEmail', agency.email, "ID70 Crisis Management System <id70cms@cms.com>", subject, content);
		});
	},

	/**
	*	Edit a particular case entry into the database.
	*/
	editCase: function (caseId, title, category, description, address, coordinate, severity, status, broadcast) {
		// var currentUser = Meteor.user();
		// if (['admin', 'call-center-operator'].indexOf(currentUser.profile.type) === -1) {
		// 	throw new Meteor.Error("Unauthorized account", "Your account is not authorized!");
		// }
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
				"Description : " + description + "<br>" +
				"Severity        : " + severity + "<br>" +
				"Date/time   : " + Meteor.call('dateToString', oldCase.createdOn) + "<br>" +
				"Please avoid travelling to that area until further notification is sent.<br>";

			contentFB = "A " + category +" has been reported at " + address + " on " + Meteor.call('dateToString', oldCase.createdOn) + " with " + severity + " severity" + ".\n" + 
						"All citizens are advised not to approach the are until further update." + "\n\n" + 
						"ID70 Crisis Management Team";

			contentTwitter = "A " + category + " has been reported at " + address + " on " + Meteor.call('dateToString', oldCase.createdOn) + ".";
		} 
		// A closed case
		else if (status === "Closed") {
			subject = "[CASE CLOSED] " + category + " at " + address + ".";
			content = "The " + category + " reported at " + address + " on " + Meteor.call('dateToString', oldCase.createdOn) + " has been resolved.<br>";
			contentFB = "The " + category + " reported at " + address + " on " + Meteor.call('dateToString', oldCase.createdOn) + " has been resolved." + "\n\n" + "ID70 Crisis Management Team";
			contentTwitter = "The " + category + " reported at " + address + " on " + Meteor.call('dateToString', oldCase.createdOn) + " has been resolved.";
		}
		// Rejected case needs not be broadcasted
		else if (status === "Rejected") {
			return;
		}
		// Any other update (usual case edit)
		else {
			subject = "🔔 " + category + " at " + address + ".";
			content = "The " + category + " reported at " + oldCase.address + " on " + Meteor.call('dateToString', oldCase.createdOn) + " has been updated.<br>" +
				"Address     : " + address + "<br>" +
				"Description : " + description + "<br>" +
				"Severity        : " + severity + "<br>" +
				"Please avoid travelling to that area until further notification is sent.<br>";

			contentFB = "[UPDATE] " + category + " has been reported at " + address + " on " + Meteor.call('dateToString', oldCase.createdOn) +".\n" +
						"All citizens are advised not to approach the area until further update." + "\n\n" +
						"ID70 Crisis Management Team";

			contentTwitter = "[UPDATE] " + category + " has been reported at " + address + " on " + Meteor.call('dateToString', oldCase.createdOn) +".";
		}

		if (broadcast) {
			Meteor.call("broadcastEmail", subject, content);
			Meteor.call("postFB", contentFB);
			Meteor.call("postTweet", contentTwitter);
		}
	},

	/**
	*	Delete a particular case entry from the database.
	*/
	deleteCase: function (caseId) {
		var currentUser = Meteor.user();
		if (['admin', 'call-center-operator'].indexOf(currentUser.profile.type) === -1) {
			throw new Meteor.Error("Unauthorized account", "Your account is not authorized!");
		}

		Cases.remove(caseId);
	},

	/**
	*	A method which converts a date object into a date with the GMT+8 timezone
	*/
	convertToGMT8: function (date) {
		var utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;

		var singaporeUTCOffset = 8;
		return new Date(utc + singaporeUTCOffset * 60 * 60 * 1000);
	},

	/**
	*	A method which converts a date into a specific String format
	*/
	dateToString: function (date) {
		var hour = date.getHours() < 10? "0" + date.getHours() : date.getHours();
		var minute = date.getMinutes() < 10? "0" + date.getMinutes() : date.getMinutes();
		var month = date.getMonth() + 1;

		switch (month) {
			case 1:
				month = "January";
				break;
			case 2:
				month = "February";
				break;
			case 3:
				month = "March";
				break;
			case 4:
				month = "April";
				break;
			case 5:
				month = "May";
				break;
			case 6:
				month = "June";
				break;
			case 7:
				month = "July";
				break;
			case 8:
				month = "August";
				break;
			case 9:
				month = "September";
				break;
			case 10:
				month = "October";
				break;
			case 11:
				month = "November";
				break;
			case 12:
				month = "December";
				break;
		}

		return date.getDate() + " " + month + " " + date.getFullYear() + " " + hour + ":" + minute;
	}
});