Template.mapFormContent.helpers({
	getCategoryList: function () {
		return Categories.find();
	},
	isLoggedIn: function () {
		var currentUser = Meteor.user();
		if (!!currentUser && ['admin', 'call-center-operator'].indexOf(currentUser.profile.type) > -1) return true;
		else return false;
	}
});