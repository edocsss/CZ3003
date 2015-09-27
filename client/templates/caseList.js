Template.caseList.onRendered(function () {
    // view one case in modal
    // edit --> edit status
    // no need for quick status update (approve/decline?)
    // .... how to add record to case collections? --> wait for Aristo
});

Template.caseList.helpers({
    isEmptyCaseList: function () {
        return true;
        return Meteor.cases.find({
            'type': 'accepted'
        }).count() === 0;
    },
    caseList: function () {
        return [];
        return  Meteor.cases.find({
            'type': 'accepted'
        }); 
    },
});

Template.caseList.events({
    'click #approve-case-button': function () {
        Meteor.call('approveCase', this._id, function (error, result) {
            if (error) {
                swal('Approval error', error.reason, 'error');
            }
        });
    },
    'click #decline-case-button': function () {
        Meteor.call('declineCase', this._id, function (error, result) {
            if (error) {
                swal('Decline error', error.reason, 'error');
            }
        });
    },
    'click #edit-case-button': function () {
        Router.go('editCase', {
            _id: this._id
        });
    },

    'click #delete-case-button': function () {
        Meteor.call('deleteCase', this._id, function (error, result) {
            if (error) {
                swal('Delete Case', error.reason, 'error');
            } else {
                swal('Delete Case', 'The case has been deleted.', 'success');
            }
        });
    }
});