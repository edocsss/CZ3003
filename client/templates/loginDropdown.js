/**
*	Author: Edwin Candinegara	
*/

Session.setDefault('isLoginForm', true);
Template.loginDropdown.helpers({
	'isLoginForm': function () {
		return Session.get('isLoginForm');
	}
});