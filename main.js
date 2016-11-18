var app = angular.module('app', []);

app.controller('Controller', function Controller($scope) {

    $scope.counter = 0;
    $scope.display_counter = Math.round($scope.counter);

    $scope.salary = 4000;
    $scope.salaryFrequency = "monthly";

    $scope.refresh_rate = 1;

    function incr() {

        var amount = 0; // Value won per second
        amount = $scope.salary / 30.0 / 24.0 / 60.0 / 60.0; //
        if (!($scope.salaryFrequency == "monthly")) {
            amount = amount / 365;
        }

        amount = amount * $scope.refresh_rate / 1000.0; // apply refresh rate

        $scope.counter = $scope.counter + amount;
        $scope.display_counter = Math.round($scope.counter);

        $scope.$apply();
    }

    $scope.interval = setInterval(incr, $scope.refresh_rate);

});