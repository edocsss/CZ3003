Router.configure({
	layoutTemplate: 'mainBody'
});

Router.route('/', {
	template: 'map'
});

Router.route('/cases', {
	template: 'caseList',
	onBeforeAction: function () {
		var user = Meteor.user();

		// When there is a logged in user, then it is either an Admin or Call Center Operator
		// So, either users can see the cases
		if (user) {
			this.next();
		} else {
			Router.go('/');
		}
	}
});