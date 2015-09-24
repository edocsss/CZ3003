Router.configure({
	layoutTemplate: 'mainBody'
});

Router.route('/', {
	template: 'map'
});

Router.route('/cases', {
	template: 'caseList',
	onBeforeAction: function () {
		// Use Meteor.userId() instead of Meteor.user()
		// When using Meteor.user(), the router does not wait for it to return
		// a user object
		// Instead, it will return "undefined"
		var user = Meteor.userId();

		// When there is a logged in user, then it is either an Admin or Call Center Operator
		// So, either users can see the cases
		if (!user) {
			Router.go('/');
		} else {
			this.next();
		}
	}
});

Router.route('/reset-password/:token', {
	template: 'resetPasswordForm',
	onBeforeAction: function () {
		Accounts._resetPasswordToken = this.params.token;
		this.next();
	}
});

Router.route('/unsubscribe/:subscriberId', {
	template: 'unsubscribeForm',
	onBeforeAction: function () {
		Session.set('subscriberId', this.params.subscriberId);
		this.next();
	}
});
