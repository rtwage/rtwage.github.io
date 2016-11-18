var app = angular.module('app', []);

app.controller('Controller', function Controller($scope) {

    $scope.counter = 0;
    $scope.display_counter = Math.round($scope.counter);

    $scope.increment = 4000;
    $scope.monthly = true; // otherwise it is annuary

    $scope.refresh_rate = 1;

    function incr() {

        var amount = 0; // Value won per second
        amount = $scope.increment / 30.0 / 24.0 / 60.0 / 60.0; //
        if (!$scope.monthly) {
            amount = amount / 365;
        }

        amount = amount * $scope.refresh_rate / 1000.0; // apply refresh rate

        $scope.counter = $scope.counter + amount
        $scope.display_counter = Math.round($scope.counter);

        $scope.$apply();
    }

    $scope.interval = setInterval(incr, $scope.refresh_rate);

});