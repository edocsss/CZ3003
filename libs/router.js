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
		console.log(user);
		if (!user) {
			Router.go('/');
		} else {
			this.next();
		}
	}
});