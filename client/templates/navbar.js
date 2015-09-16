Template.navbar.helpers({
	isUserAdmin: function () {
		var userType = Meteor.user().profile.type;
		return (userType === 'admin');
	}
});

Template.navbar.events({
	'click .logout-link': function (event) {
		event.preventDefault();
		Meteor.logout();
		Router.go('/');
	}
});