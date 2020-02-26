//I am using an IIFE here
(function (angular) {
    'use strict';

    angular
        .module('RxAdminsterApp')
        .controller('RxAdminsterController', RxAdminsterController);

    //inject for minification purposes
    RxAdminsterController.$inject = ["patientServices"];

    //try not to add any logic in the controllers.
    //use services to perform any business logic and data fetching functionalities

    function RxAdminsterController(patientServices) {
        //get a reference to the view model
        var vm = this;

        //define all properties that are publically accessible by the view
        vm.allPatients = [];
        vm.patientDrugs = [];
        vm.errorMessage = "";
        vm.isDrugsMode = false;
        vm.selectedPatient = null;

        //define all methods that are publically accessible by the view
        vm.$onInit = initialize; // add a life cycle hook to call the initialize function after DOM is rendered
        vm.fetchDrugsForPatient = fetchDrugsForPatient;
        vm.showAllPatients = showAllPatients;

        function initialize() {
            //load all patient information on page load
            patientServices.getAllPatients().then(
                function (data) {
                    vm.allPatients = data;
                }, function (error) {
                    vm.errorMessage = "An error occured when fetching patient data";
                });
        }

        //initialize drug mode
        function fetchDrugsForPatient(patientId) {
            //extract the selected patient from the patient list
            var selectedPatient = vm.allPatients.filter(function (patient) { return patient.Id === patientId; });
            if (selectedPatient.length > 0) {
                vm.selectedPatient = selectedPatient[0];
                //fetch drug information for the selected patient
                patientServices.GetDrugsByPatientId(patientId).then(
                    function (data) {
                        vm.isDrugsMode = true;
                        vm.patientDrugs = data;
                    }, function (error) {
                        vm.errorMessage = "An error occured when fetching drugs for selected patient";
                    });
            }
        }

        //change display mdoe to show all patients
        function showAllPatients() {
            vm.isDrugsMode = false;
        }
    }
})(angular);