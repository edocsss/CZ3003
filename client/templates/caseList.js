Template.caseList.onRendered(function () {
    // view one case in modal
    // edit --> edit status
    // no need for quick status update (approve/decline?)
    // .... how to add record to case collections? --> wait for Aristo
});

Template.caseList.helpers({
    isEmptyCaseList: function () {
        return Cases.find({}).count() === 0;
    },
    caseList: function () {
        return Cases.find({}); 
    },
});

Template.caseList.events({
    'click #edit-case-button': function () {
        Router.go('editCase', {
            _id: this._id
        });
    },

    'click #delete-case-button': function () {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this case!",
            type: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            closeOnConfirm: false,
            confirmButtonColor: "#E51C23",
            html: false
        }, function() {
            Meteor.call('deleteCase', this._id, function (error, result) {
                console.log(error);
                if (error) {
                    swal('Delete Case', error.reason, 'error');
                } else {
                    swal('Delete Case', 'The case has been deleted.', 'success');
                }
            });
        }.bind(this));

        
    }
});