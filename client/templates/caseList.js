Template.caseList.onRendered(function () {
    // view one case in modal
    // edit --> edit status
    // no need for quick status update (approve/decline?)
    // .... how to add record to case collections? --> wait for Aristo
    Session.set('filterCategory', 'All');
    Session.set('filterSeverity', 'All');
    Session.set('filterStatus', 'All');
});

Template.caseList.helpers({
    isEmptyCaseList: function () {
        var selector = {
            category: Session.get('filterCategory'),
            severity: Session.get('filterSeverity'),
            status: Session.get('filterStatus')
        };

        // Remove unused selector
        for (var x in selector) {
            if (selector[x] === 'All') {
                delete selector[x];
            }
        }

        return Cases.find(selector).count() === 0;
    },
    caseList: function () {
        var selector = {
            category: Session.get('filterCategory'),
            severity: Session.get('filterSeverity'),
            status: Session.get('filterStatus')
        };

        // Remove unused selector
        for (var x in selector) {
            if (selector[x] === 'All') {
                delete selector[x];
            }
        }

        return Cases.find(selector, {
            sort: {
                lastUpdatedOn: -1
            }
        }); 
    },
    isSeveritySet: function () {
    	return this.severity === null;
    }
});

Template.caseList.events({
    'click #edit-case-button': function () {
        Router.go('editCase', {
            _id: this._id
        });
    },
    'change .filter-case': function () {
        var category = $('#filter-case-category').val();
        var severity = $('#filter-case-severity').val();
        var status = $('#filter-case-status').val();

        Session.set('filterCategory', category);
        Session.set('filterSeverity', severity);
        Session.set('filterStatus', status);
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