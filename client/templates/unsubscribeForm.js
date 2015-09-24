Template.unsubscribeForm.events({
	'click #unsubscribeButton': function (event) {
		event.preventDefault();
		var subscriberId = Session.get('subscriberId');

		Meteor.call('removeSubscriber', subscriberId, function (error, result) {
			if (error) {
				console.log(error.error);
			} else {
				swal('Unsubscription', 'Your email address has been successfully removed from our mailing list!', 'success');
				Session.set('subscriberId', null);
				Router.go('/');
			}
		});
	},

	'click #cancelUnsubscribeButton': function (event) {
		event.preventDefault();
		Router.go('/');
	}
});