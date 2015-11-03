Meteor.methods({
	/**
	*	A general method which is capable of sending an email given the required details such as the target email address,
	*	the originating email address, the subject, and the content of the email.
	*/
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

	/**
	*	Broadcast emails to subscribers in case there is a new case update.
	*/
	broadcastEmail: function (subject, content) {
		var base_url = Meteor.absoluteUrl() + "unsubscribe/";
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
	}
});