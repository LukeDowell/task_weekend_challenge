/**
 * Created by Luke on 8/14/2015.
 */
var app = angular.module('myApp', ['ngMaterial']);

app.controller('AppController', ['$scope', '$http', function($scope, $http) {
    $http.post('/tasks', {
        message: "A basic task"
    }).then(function(response) {
        console.log(response.data);
        $http.get('/tasks').then(function(response) {
            console.log(response.data);
        });
    });
}]);