Meteor.startup(function () {
	// Setting up Twitter API
	TwitterApi = Meteor.npmRequire('twit');
	twitter = new TwitterApi({
		consumer_key: 'Tw6sIuQJ50pUtAka6gqyaTlnN',
		consumer_secret: 'suDNqDBXu91XAYJIoUERfDH0nuU5aTVavMpSLbi6rQTuuzNP6p',
		access_token: '3668823973-YgRBfVC6vbjnzN1Yws6coRD5MprEOdr7mzBct0j',
		access_token_secret: 'HM4WHpwoq9tX2pTVctJJ9ChauZbI7ipXgeYc7mJvIe9b8'
	});
});

Meteor.methods({
	/**
	*	Post a Tweet to ID70 Twitter account using a Meteor Twitter API Package
	*/
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
	}
});