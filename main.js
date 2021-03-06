var app = angular.module('app', []);

app.config(function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

app.controller('Controller', ['$scope', '$location' ,function Controller($scope, $location) {

    $scope.counter = 0;
    $scope.display_counter = Math.round($scope.counter);

    $scope.salary = $location.search().salary || 1000;
    $scope.salaryFrequency = $location.search().freq || "monthly";
    $scope.startAt = $location.search().start || "now";

    var start_tick = 0;
    var refresh_rate = 10;
    var page_open = new Date();

    function update() {
        // Update Start
        if ($scope.startAt === "now") {
            start_tick = page_open.getTime();
        } else if ($scope.startAt === "day") {
            start_tick = new Date(page_open.getFullYear(), page_open.getMonth(), page_open.getDate(), 0, 0, 0, 0).getTime();
        } else if ($scope.startAt === "month") {
            start_tick = new Date(page_open.getFullYear(), page_open.getMonth(), 0, 0, 0, 0, 0).getTime();
        } else if ($scope.startAt === "year") {
            start_tick = new Date(page_open.getFullYear(), 0, 0, 0, 0, 0, 0).getTime();
        }

        // Update Diff
        var now = new Date().getTime();
        var diff = (now - start_tick) / 1000.0;

        var second_gain = $scope.salary / 30.0 / 24.0 / 60.0 / 60.0;

        if ($scope.salaryFrequency == "yearly") {
            second_gain /= 12;
        }

        // Display
        $scope.counter = diff * second_gain;
        $scope.display_counter = $scope.counter.toFixed(5);
        $scope.$apply();
    }

    $scope.interval = setInterval(update, refresh_rate);

}]);
