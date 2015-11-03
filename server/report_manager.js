Meteor.methods({
	/**
	*	Send a case summary to the Prime Minister office. The cases included in the summary will be all cases
	*	up to that point in time when this email is sent.
	*
	*	This method is called by a cron job for every 30 minutes.
	*/
	sendCaseSummary: function () {
		// Construct the summary message here
		var currentDate = Meteor.call('convertToGMT8', new Date());
		var content = "Dear Prime Minister," +
					  "<br><br>" +
					  "This email contains a case summary up to " + Meteor.call('dateToString', currentDate) + ".<br><br>" + 
					  '<table style="width: 100%; border-collapse: collapse; border: 1px solid black">' +
					  '<thead>' + 
					  '<tr>' +
					  '<th style="border: 1px solid black; padding: 5px;">' +
					  'Title' +
					  '</th>' +
					  '<th style="border: 1px solid black; padding: 5px;">' +
					  'Category' +
					  '</th>' +
					  '<th style="border: 1px solid black; padding: 5px;">' +
					  'Description' +
					  '</th>' +
					  '<th style="border: 1px solid black; padding: 5px;">' +
					  'Address' +
					  '</th>' +
					  '<th style="border: 1px solid black; padding: 5px;">' +
					  'Severity' +
					  '</th>' +
					  '<th style="border: 1px solid black; padding: 5px;">' +
					  'Status' +
					  '</th>' +
					  '</tr>' +
					  '</thead>' +
					  '<tbody>';

		var cases = Cases.find({});

		if (cases.count() === 0) {
			content += '<tr>' + '<td colspan="6" style="text-align:center; border: 1px solid black padding: 5px;">' + 'There is no case reported yet!' + '</td>' + '</tr>';
		} else {
			Cases.find({}).forEach(function (item) {
				content +=  '<tr>' +
							'<td style="border: 1px solid black; padding: 5px;">' +
							item.title +
							'</td>' +
							'<td style="border: 1px solid black; padding: 5px;">' +
							item.category +
							'</td>' +
							'<td style="border: 1px solid black; padding: 5px;">' +
							item.description +
							'</td>' +
							'<td style="border: 1px solid black; padding: 5px;">' +
							item.address +
							'</td>' +
							'<td style="border: 1px solid black; padding: 5px;">' +
							item.severity +
							'</td>' +
							'<td style="border: 1px solid black; padding: 5px;">' +
							item.status +
							'</td>' +
							'</tr>';
			});
		}

		content +=  '</tbody>' +
					'</table>' +
					'<br><br>' +
					'ID70 Crisis Management Team';

		Meteor.call('sendEmail',
			"edocsss@gmail.com",
			"ID70 Crisis Management System <id70cms@cms.com>",
			"ID70 30-Minutes Case Summary",
			content);
	}
});