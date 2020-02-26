(function (angular) {
    'use strict';

    angular
        .module('RxAdminsterApp')
        .factory('patientServices', patientServices);

    patientServices.$inject = ["$http"];

    function patientServices($http) {

        var service = {
            getAllPatients: getAllPatients,
            GetDrugsByPatientId: GetDrugsByPatientId
        };

        return service;

        function getAllPatients() {
           return $http.get('http://127.0.0.1:8887/dummy_json_AllPatients.js').then(
                function (data){
                return data;
            },
            function(error){
                return error;
            });
        }

        function GetDrugsByPatientId(id) {
            return $http.get('http://127.0.0.1:8887/dummy_json_SinglePatientDrugs.js').then(
                function (data){
                return data;
            },
            function(error){
                return error;
            });
        }

    }
})(angular);