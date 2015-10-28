/**
*	Author: Edwin Candinegara	
*/

Template.navbar.onRendered(function () {
	// Initial weather reading
	getWeather();

	// Update weather every 5 minutes
	Meteor.setInterval(getWeather, 30000);
});

Template.navbar.helpers({
	isUserAdmin: function () {
		var userType = Meteor.user().profile.type;
		return (userType === 'admin');
	}
});

Template.navbar.events({
	'click .logout-link': function (event) {
		event.preventDefault();
		Meteor.logout(function (error) {
			if (error) {
				console.log(error);
			} else {
				Router.go('home');
			}
		});
	}
});

function getWeather() {
	$.simpleWeather({
		location: 'Singapore, Singapore',
		woeid: '23424948',
		unit: 'c',
		success: function (weather) {
			var temp = weather.temp;
			var tempUnit = weather.units.temp;
			var currentCondition = weather.currently;
			var codeCondition = weather.code;
			var html = "<h2 class='weather-header'><i class='weather-logo weather-icon-" + 
						codeCondition + 
						"'></i>&nbsp;" + 
						temp + 
						"&deg" + 
						tempUnit + 
						" " +
						currentCondition +
						"</h2>";
			$(".weather-status").html(html);
		}
	});
}