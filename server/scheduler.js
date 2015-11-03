Meteor.startup(function () {
	// Setting up the case summary cron job
	var cron = new Meteor.Cron({
		// * * * * * --> every minute
		// 30 * * * * --> every hour, when the clock hits the minute = 30
		events: {
			'0 * * * * ': function () {
				Meteor.call('sendCaseSummary');
			},
			'30 * * * *': function () {
				Meteor.call('sendCaseSummary');
			}
		}
	});
});