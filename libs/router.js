/**
*	Author: Edwin Candinegara, Kenrick, Joshua Aristo, Peter
*/

Router.configure({
	layoutTemplate: 'mainBody',
	loadingTemplate: 'loading'
});

Router.route('home', {
	path: '/',
	template: 'map'
});

Router.route('resetPasword', {
	path: '/reset-password/:token',
	template: 'resetPasswordForm',
	onBeforeAction: function () {
		Accounts._resetPasswordToken = this.params.token;
		this.next();
	}
});

Router.route('enrollAccount', {
	path: '/enroll-account/:token',
	template: 'enrollAccountForm',
	onBeforeAction: function () {
		Accounts._resetPasswordToken = this.params.token;
		this.next();
	}
});

Router.route('unsubscribe', {
	path: '/unsubscribe/:subscriberId',
	template: 'unsubscribeForm',
	onBeforeAction: function () {
		Session.set('subscriberId', this.params.subscriberId);
		this.next();
	}
});

Router.route('cases', {
	path: '/cases',
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
			this.redirect('home');
		} else {
			this.next();
		}
	}
});


Router.route('editCase', {
	path: '/edit-case/:_id',
	template: 'editCase',
	data: function () {
		return Cases.findOne({_id: this.params._id});
	},
	onBeforeAction: function () {
		var userId = Meteor.userId();
		if (userId) {
			this.next();
		} else {
			this.redirect('home');
		}
	}
});

Router.route('agencies', {
	path: '/agencies',
	template: 'agencyList',
	onBeforeAction: function () {
		var userId = Meteor.userId();
		if (userId) {
			var user = Meteor.users.findOne(userId);
			if (user.profile.type === 'admin') {
				this.next();
			} else {
				this.redirect('home');
			}
		} else {
			this.redirect('home');
		}
	}
});

Router.route('editAgency', {
	path: '/edit-agency/:_id',
	template: 'editAgency',
	data: function () {
		return Agencies.findOne({_id: this.params._id});
	},
	onBeforeAction: function () {
		var userId = Meteor.userId();
		if (userId) {
			var user = Meteor.users.findOne(userId);
			if (user.profile.type === 'admin') {
				this.next();
			} else {
				this.redirect('home');
			}
		} else {
			this.redirect('home');
		}
	}
});

Router.route('operators', {
	path: '/operators',
	template: 'callCenterOperatorList',
	onBeforeAction: function () {
		var userId = Meteor.userId();
		if (userId) {
			var user = Meteor.users.findOne(userId);
			if (user.profile.type === 'admin') {
				this.next();
			} else {
				this.redirect('home');
			}
		} else {
			this.redirect('home');
		}
	}
});

Router.route('editOperator', {
	path: '/edit-operator/:_id',
	template: 'editCallCenterOperator',
	data: function () {
		return Meteor.users.findOne({_id: this.params._id});
	},
	onBeforeAction: function () {
		var userId = Meteor.userId();
		if (userId) {
			var user = Meteor.users.findOne(userId);
			if (user.profile.type === 'admin') {
				this.next();
			} else {
				this.redirect('home');
			}
		} else {
			this.redirect('home');
		}
	}
});