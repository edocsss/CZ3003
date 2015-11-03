Meteor.methods({
	/**
	*	Post a case update to ID70 Facebook Page through a HTTP POST request.
	*/
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
				console.log(result);
			}
		});
	}
});