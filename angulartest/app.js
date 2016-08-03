var app = angular.module('myApp', []);
var data = [
    {
        name: 'Anna',
        surname: 'Waller',
        age: 24,
        email: 'anna@mail.com'
    },
    {
        name: 'Mich',
        surname: 'Keller',
        age: 38,
        email: 'mich@mail.com'
    },
    {
        name: 'Lola',
        surname: 'Ringer',
        age: 45,
        email: 'lola@mail.com'
    }
];

app.controller('MyTableController', function ($scope) {
    $scope.data = data;

    $scope.deleteRow = function (rowToDelete) {
        $scope.data.splice(rowToDelete, 1);
    };
    $scope.addNewRow = function () {
        var rowTemplate = {
            name: '',
            surname: '',
            age: '',
            email: '',
            newRow: true
        };
        $scope.data.push(rowTemplate);
    };

});

app.controller('MyRowController', function ($scope) {
    $scope.editMode = false;

    $scope.editRow = function (row) {
        row.backupModel = angular.copy(row);
        $scope.editMode = true;
    };
    $scope.applyChanges = function (row) {
        $scope.editMode = false;
        delete row.backupModel;
        delete row.newRow;
    };
    $scope.cancelChanges = function (row) {
        $scope.editMode = false;
        $scope.$parent.user = angular.copy(row.backupModel);
        delete $scope.$parent.user.newRow;
        delete row.backupModel;
    };

});

