var app = angular.module('app', []);

app.controller('Controller', function Controller($scope) {

    $scope.counter = 0;
    $scope.display_counter = Math.round($scope.counter);

    $scope.salary = 4000;
    $scope.salaryFrequency = "monthly";
    $scope.startAt = "now"

    var start_tick = 0
    var refresh_rate = 10;
    var page_open = new Date()

    function update() {
        // Update Start
        if ($scope.startAt === "now") {
            start_tick = page_open.getTime()
        } else if ($scope.startAt === "month") {
            start_tick = new Date(page_open.getFullYear(), page_open.getMonth(), 0, 0, 0, 0, 0).getTime()
        } else if ($scope.startAt === "year") {
            start_tick = new Date(page_open.getFullYear(), 0, 0, 0, 0, 0, 0).getTime()
        }

        // Update Diff
        var now = new Date().getTime()
        var diff = (now - start_tick) / 1000.0

        var second_gain = $scope.salary / 30.0 / 24.0 / 60.0 / 60.0;

        if ($scope.salaryFrequency == "yearly") {
            second_gain = second_gain  / 365;
        }

        // Display
        $scope.counter = diff * second_gain
        $scope.display_counter = $scope.counter.toFixed(5);
        $scope.$apply();
    }

    $scope.interval = setInterval(update, refresh_rate);

});